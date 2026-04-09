import type { ApiEnv } from '@training/shared/config'

export interface AppExtra {
  apiEnv: ApiEnv
  apiUrl: string
  apiTimeoutMs: number
  apiRetryCount: number
  enableLogging: boolean
  allowOfflineMode: boolean
}
