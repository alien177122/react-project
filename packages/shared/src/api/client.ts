import type { ApiConfig } from '../config/api.ts'

export interface ApiLogger {
  log?: (...args: unknown[]) => void
  error?: (...args: unknown[]) => void
}

export type ApiResponseMode = 'json' | 'text' | 'void'

export interface ApiRequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
  body?: unknown
  headers?: Record<string, string>
  token?: string
  parseAs?: ApiResponseMode
  handleUnauthorized?: boolean
}

export interface ApiClientOptions {
  config: Pick<ApiConfig, 'baseUrl' | 'timeoutMs'>
  onUnauthorized?: () => void | Promise<void>
  logger?: ApiLogger
}

export class ApiClientError extends Error {
  readonly endpoint: string
  readonly method: string
  readonly status?: number
  readonly responseBody?: unknown

  constructor(
    message: string,
    {
      endpoint,
      method,
      status,
      responseBody,
      cause,
    }: {
      endpoint: string
      method: string
      status?: number
      responseBody?: unknown
      cause?: unknown
    },
  ) {
    super(message)
    this.name = 'ApiClientError'
    this.endpoint = endpoint
    this.method = method
    this.status = status
    this.responseBody = responseBody
    if (cause !== undefined) {
      Object.defineProperty(this, 'cause', {
        configurable: true,
        enumerable: false,
        value: cause,
        writable: true,
      })
    }
  }
}

export class ApiUnauthorizedError extends ApiClientError {
  constructor(
    message: string,
    args: {
      endpoint: string
      method: string
      status: number
      responseBody?: unknown
      cause?: unknown
    },
  ) {
    super(message, args)
    this.name = 'ApiUnauthorizedError'
  }
}

export class ApiTimeoutError extends ApiClientError {
  constructor(
    message: string,
    args: {
      endpoint: string
      method: string
      cause?: unknown
    },
  ) {
    super(message, args)
    this.name = 'ApiTimeoutError'
  }
}

export class ApiNetworkError extends ApiClientError {
  constructor(
    message: string,
    args: {
      endpoint: string
      method: string
      cause?: unknown
    },
  ) {
    super(message, args)
    this.name = 'ApiNetworkError'
  }
}

export class ApiResponseParseError extends ApiClientError {
  constructor(
    message: string,
    args: {
      endpoint: string
      method: string
      status: number
      responseBody?: unknown
      cause?: unknown
    },
  ) {
    super(message, args)
    this.name = 'ApiResponseParseError'
  }
}

export interface ApiClient {
  request<T>(endpoint: string, options?: ApiRequestOptions): Promise<T>
  get<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'body' | 'method'>): Promise<T>
  post<T>(endpoint: string, body?: unknown, options?: Omit<ApiRequestOptions, 'body' | 'method'>): Promise<T>
  put<T>(endpoint: string, body?: unknown, options?: Omit<ApiRequestOptions, 'body' | 'method'>): Promise<T>
  delete<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'body' | 'method'>): Promise<T>
}

function joinApiUrl(baseUrl: string, endpoint: string): string {
  if (/^https?:\/\//i.test(endpoint)) return endpoint

  const normalizedBase = baseUrl.replace(/\/+$/, '')
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

  if (!normalizedBase || normalizedBase === '/') return normalizedEndpoint
  return `${normalizedBase}${normalizedEndpoint}`
}

function extractMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string' && payload.error.trim()) {
    return payload.error.trim()
  }

  if (typeof payload === 'string' && payload.trim()) return payload.trim()
  return fallback
}

function serializeBody(body: unknown, headers: Headers): RequestInit['body'] | undefined {
  if (body === undefined) return undefined
  if (typeof body === 'string') return body
  if (typeof FormData !== 'undefined' && body instanceof FormData) return body as RequestInit['body']
  if (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
    }

    return body.toString()
  }
  if (typeof Blob !== 'undefined' && body instanceof Blob) return body as RequestInit['body']
  if (body instanceof ArrayBuffer) return body as RequestInit['body']

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  return JSON.stringify(body)
}

async function parseResponseBody<T>(
  response: Response,
  mode: ApiResponseMode,
  endpoint: string,
  method: string,
): Promise<T> {
  if (mode === 'void' || response.status === 204 || response.status === 205) {
    return undefined as T
  }

  const text = await response.text()

  if (mode === 'text') return text as T
  if (!text.trim()) return undefined as T

  try {
    return JSON.parse(text) as T
  } catch (error) {
    throw new ApiResponseParseError('Сервер вернул некорректный JSON', {
      endpoint,
      method,
      status: response.status,
      responseBody: text,
      cause: error,
    })
  }
}

async function parseErrorResponseBody(
  response: Response,
): Promise<unknown> {
  const text = await response.text()
  if (!text.trim()) return undefined

  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

function logSuccess(logger: ApiLogger | undefined, method: string, endpoint: string, status: number, durationMs: number) {
  logger?.log?.(`[API] ${method} ${endpoint}: ${status} (${durationMs}ms)`)
}

function logFailure(logger: ApiLogger | undefined, method: string, endpoint: string, durationMs: number, error: unknown) {
  logger?.error?.(`[API] ${method} ${endpoint} failed (${durationMs}ms)`, error)
}

export function createApiClient({ config, onUnauthorized, logger }: ApiClientOptions): ApiClient {
  async function request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    const method = (options.method ?? 'GET').toUpperCase()
    const parseAs = options.parseAs ?? 'json'
    const handleUnauthorized = options.handleUnauthorized ?? true
    const url = joinApiUrl(config.baseUrl, endpoint)
    const startedAt = Date.now()

    const headers = new Headers(options.headers)
    if (options.token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${options.token}`)
    }

    const body = serializeBody(options.body, headers)

    const controller = new AbortController()
    let timedOut = false
    const timeoutId = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, config.timeoutMs)

    const externalAbortHandler = () => controller.abort()
    if (options.signal) {
      if (options.signal.aborted) {
        controller.abort()
      } else {
        options.signal.addEventListener('abort', externalAbortHandler, { once: true })
      }
    }

    try {
      const response = await fetch(url, {
        ...options,
        body,
        headers,
        signal: controller.signal,
      })

      const durationMs = Date.now() - startedAt

      if (!response.ok) {
        const errorPayload = await parseErrorResponseBody(response)

        const message = extractMessage(errorPayload, `API Error: ${response.status}`)
        if (response.status === 401 || response.status === 403) {
          if (handleUnauthorized) await onUnauthorized?.()

          const error = new ApiUnauthorizedError(message, {
            endpoint,
            method,
            status: response.status,
            responseBody: errorPayload,
          })
          logFailure(logger, method, endpoint, durationMs, error)
          throw error
        }

        const error = new ApiClientError(message, {
          endpoint,
          method,
          status: response.status,
          responseBody: errorPayload,
        })
        logFailure(logger, method, endpoint, durationMs, error)
        throw error
      }

      const payload = await parseResponseBody<T>(response, parseAs, endpoint, method)
      logSuccess(logger, method, endpoint, response.status, durationMs)
      return payload
    } catch (error) {
      const durationMs = Date.now() - startedAt
      if (error instanceof ApiClientError) throw error

      if (timedOut) {
        const timeoutError = new ApiTimeoutError('Сервер не ответил вовремя', {
          endpoint,
          method,
          cause: error,
        })
        logFailure(logger, method, endpoint, durationMs, timeoutError)
        throw timeoutError
      }

      const networkError = new ApiNetworkError('Нет соединения с сервером', {
        endpoint,
        method,
        cause: error,
      })
      logFailure(logger, method, endpoint, durationMs, networkError)
      throw networkError
    } finally {
      clearTimeout(timeoutId)
      if (options.signal) {
        options.signal.removeEventListener('abort', externalAbortHandler)
      }
    }
  }

  return {
    request,
    get(endpoint, options) {
      return request(endpoint, { ...options, method: 'GET' })
    },
    post(endpoint, body, options) {
      return request(endpoint, { ...options, method: 'POST', body })
    },
    put(endpoint, body, options) {
      return request(endpoint, { ...options, method: 'PUT', body })
    },
    delete(endpoint, options) {
      return request(endpoint, { ...options, method: 'DELETE' })
    },
  }
}
