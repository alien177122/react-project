import { useEffect, useState } from 'react'
import type { FileWorkspaceResponse, WorkspaceFileEntry } from '../types'
import { analyzeFileWorkspace, analyzeSingleWorkspaceFile, loadFileWorkspace } from '../utils/api'

export default function FileWorkspaceTab({ token }: { token: string }) {
  const [data, setData] = useState<FileWorkspaceResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [activeFile, setActiveFile] = useState('')
  const inboxPath = data?.paths.inboxDir ?? 'workspace-files/inbox'
  const analysisPath = data?.paths.analysisDir ?? 'workspace-files/analysis'

  async function refreshWorkspace() {
    setLoading(true)
    setError('')
    try {
      const next = await loadFileWorkspace(token)
      setData(next)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Не удалось загрузить файловое workspace')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false

    async function initialLoad() {
      setLoading(true)
      setError('')
      try {
        const next = await loadFileWorkspace(token)
        if (!cancelled) setData(next)
      } catch (nextError) {
        if (!cancelled) {
          setError(nextError instanceof Error ? nextError.message : 'Не удалось загрузить файловое workspace')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void initialLoad()
    return () => { cancelled = true }
  }, [token])

  async function handleAnalyzeAll() {
    setAnalyzing(true)
    setError('')
    try {
      const next = await analyzeFileWorkspace(token)
      setData(next)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Не удалось запустить анализ')
    } finally {
      setAnalyzing(false)
    }
  }

  async function handleAnalyzeOne(fileName: string) {
    setActiveFile(fileName)
    setError('')
    try {
      const next = await analyzeSingleWorkspaceFile(token, fileName)
      setData(next)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : `Не удалось проанализировать ${fileName}`)
    } finally {
      setActiveFile('')
    }
  }

  function renderFileCard(file: WorkspaceFileEntry) {
    return (
      <div key={file.name} className="file-card">
        <div className="file-card-head">
          <div>
            <div className="file-card-name">{file.name}</div>
            <div className="file-card-meta">
              {file.extension} · {file.sizeLabel} · {new Date(file.modifiedAt).toLocaleString('ru-RU')}
            </div>
          </div>
          <button
            className="btn-sm btn-ghost"
            onClick={() => void handleAnalyzeOne(file.name)}
            disabled={activeFile === file.name}
          >
            {activeFile === file.name ? '...' : 'Анализ'}
          </button>
        </div>

        {file.analysis ? (
          <>
            <div className="file-card-summary">{file.analysis.summary}</div>
            {!!file.analysis.preview && (
              <pre className="file-card-preview">{file.analysis.preview}</pre>
            )}
            <div className="file-card-tags">
              {file.analysis.suggestedUse.map(tag => (
                <span key={tag} className="file-card-tag">{tag}</span>
              ))}
            </div>
            <div className="file-card-meta-list">
              {Object.entries(file.analysis.metadata).map(([key, value]) => (
                <div key={key} className="file-card-meta-row">
                  <span>{key}</span>
                  <strong>{String(value)}</strong>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="note-box" style={{ marginTop: 14 }}>
            Для файла ещё нет анализа. Добавь файл в <code>{inboxPath}</code> и нажми «Анализировать всё» или «Анализ».
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="section">
        <div className="section-header">
          <span className="section-num">01</span>
          <span className="section-title">Файловое Workspace</span>
        </div>
        <div className="note-box">
          Клади файлы в <code>{inboxPath}</code>. Система прочитает их, сохранит результат в <code>{analysisPath}</code> и
          отдаст это в сайт через API. В desktop/macOS это будет пользовательская папка приложения, в обычном web/dev режиме
          путь останется project-relative. Для изображений подключен OCR через локальный Ollama + glm-ocr.
        </div>
        <div className="files-toolbar">
          <button className="btn" onClick={() => void handleAnalyzeAll()} disabled={analyzing}>
            {analyzing ? 'Анализ...' : 'Анализировать всё'}
          </button>
          <button className="btn-sm btn-ghost" onClick={() => void refreshWorkspace()} disabled={loading}>
            Обновить список
          </button>
        </div>
        {error && <div className="auth-error" style={{ marginTop: 12 }}>{error}</div>}
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-num">02</span>
          <span className="section-title">Папки и результаты</span>
        </div>
        {loading ? (
          <div className="note-box">Загрузка файлового workspace...</div>
        ) : !data ? (
          <div className="note-box">Данные пока недоступны.</div>
        ) : (
          <>
            <div className="insight">
              <strong>Inbox:</strong> <code>{data.paths.inboxDir}</code>
              <br />
              <strong>Analysis:</strong> <code>{data.paths.analysisDir}</code>
              <br />
              <strong>OCR:</strong> <code>{data.ocr.model}</code> · <code>{data.ocr.baseUrl}</code>
              <br />
              <strong>Файлов найдено:</strong> <code>{data.files.length}</code>
            </div>

            {!data.files.length ? (
              <div className="note-box">
                В <code>{inboxPath}</code> пока пусто. Добавь туда <code>.txt</code>, <code>.md</code>, <code>.json</code>,
                <code>.csv</code>, изображения или PDF.
              </div>
            ) : (
              <div className="files-grid">
                {data.files.map(renderFileCard)}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
