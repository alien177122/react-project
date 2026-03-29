import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ScreenLayout } from '../../src/components/ScreenLayout'
import { ActionButton } from '../../src/components/ui/ActionButton'
import { SectionBlock } from '../../src/components/ui/SectionBlock'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'
import { theme } from '../../src/theme'
import type { FileWorkspaceResponse, WorkspaceFileEntry } from '../../src/types'
import {
  analyzeFileWorkspace,
  analyzeSingleWorkspaceFile,
  loadFileWorkspace,
} from '../../src/utils/api'

export default function FilesScreen() {
  const { token } = useAuthSessionContext()
  const [workspace, setWorkspace] = useState<FileWorkspaceResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [activeFile, setActiveFile] = useState('')
  const [error, setError] = useState('')

  async function refresh(mode: 'load' | 'analyze' = 'load') {
    if (mode === 'analyze') setAnalyzing(true)
    else setLoading(true)

    setError('')
    try {
      const nextWorkspace = mode === 'load'
        ? await loadFileWorkspace(token)
        : await analyzeFileWorkspace(token)
      setWorkspace(nextWorkspace)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Не удалось получить workspace')
    } finally {
      if (mode === 'analyze') setAnalyzing(false)
      else setLoading(false)
    }
  }

  async function analyzeOne(fileName: string) {
    setActiveFile(fileName)
    setError('')
    try {
      const nextWorkspace = await analyzeSingleWorkspaceFile(token, fileName)
      setWorkspace(nextWorkspace)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : `Не удалось проанализировать ${fileName}`)
    } finally {
      setActiveFile('')
    }
  }

  useEffect(() => {
    if (!token) return
    void refresh('load')
  }, [token])

  function renderFileCard(file: WorkspaceFileEntry) {
    return (
      <View key={file.name} style={styles.fileCard}>
        <View style={styles.fileHead}>
          <View style={styles.fileHeadText}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text style={styles.fileMeta}>
              {file.extension} · {file.sizeLabel} · {new Date(file.modifiedAt).toLocaleString('ru-RU')}
            </Text>
          </View>
          <ActionButton
            label={activeFile === file.name ? '...' : 'Анализ'}
            onPress={() => void analyzeOne(file.name)}
            variant="ghost"
            disabled={activeFile === file.name}
          />
        </View>

        {file.analysis ? (
          <View style={styles.fileBody}>
            <Text style={styles.fileSummary}>{file.analysis.summary}</Text>

            {file.analysis.preview ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.previewWrap}>
                <Text style={styles.previewText}>{file.analysis.preview}</Text>
              </ScrollView>
            ) : null}

            <View style={styles.tagRow}>
              {file.analysis.suggestedUse.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.metaList}>
              {Object.entries(file.analysis.metadata).map(([key, value]) => (
                <View key={key} style={styles.metaRow}>
                  <Text style={styles.metaKey}>{key}</Text>
                  <Text style={styles.metaValue}>{String(value)}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              Для файла ещё нет анализа. Положи его в `workspace-files/inbox` и запусти анализ.
            </Text>
          </View>
        )}
      </View>
    )
  }

  return (
    <ScreenLayout
      label="Files"
      title="Файловое workspace"
      subtitle="Клади файлы в inbox, запускай анализ и смотри summary, preview и OCR-результаты прямо в mobile-версии."
    >
      <SectionBlock num="01" title="Файловое Workspace">
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Клади файлы в `workspace-files/inbox`. Система сохранит анализ в `workspace-files/analysis` и отдаст его через тот же backend, что использует веб.
          </Text>
        </View>
        <View style={styles.toolbar}>
          <ActionButton
            label={analyzing ? 'Анализ...' : 'Анализировать всё'}
            onPress={() => void refresh('analyze')}
            disabled={analyzing}
          />
          <ActionButton
            label={loading ? '...' : 'Обновить'}
            onPress={() => void refresh('load')}
            variant="ghost"
            disabled={loading}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </SectionBlock>

      <SectionBlock num="02" title="Папки и результаты">
        {loading ? (
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>Загрузка файлового workspace...</Text>
          </View>
        ) : !workspace ? (
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>Данные пока недоступны.</Text>
          </View>
        ) : (
          <>
            <View style={styles.infoCard}>
              <Text style={styles.infoLine}>Inbox: {workspace.paths.inboxDir}</Text>
              <Text style={styles.infoLine}>Analysis: {workspace.paths.analysisDir}</Text>
              <Text style={styles.infoLine}>OCR: {workspace.ocr.model} · {workspace.ocr.baseUrl}</Text>
              <Text style={styles.infoLine}>Файлов найдено: {workspace.files.length}</Text>
            </View>

            {!workspace.files.length ? (
              <View style={styles.noteBox}>
                <Text style={styles.noteText}>
                  В `workspace-files/inbox` пока пусто. Добавь туда `.txt`, `.md`, `.json`, `.csv`, изображения или PDF.
                </Text>
              </View>
            ) : (
              <View style={styles.filesGrid}>
                {workspace.files.map(renderFileCard)}
              </View>
            )}
          </>
        )}
      </SectionBlock>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  noteBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
  },
  noteText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  toolbar: {
    columnGap: theme.spacing.md,
    flexDirection: 'row',
  },
  error: {
    color: theme.colors.red,
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 8,
  },
  infoLine: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  filesGrid: {
    rowGap: theme.spacing.md,
  },
  fileCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: theme.spacing.md,
  },
  fileHead: {
    alignItems: 'flex-start',
    columnGap: theme.spacing.md,
    flexDirection: 'row',
  },
  fileHeadText: {
    flex: 1,
    rowGap: 6,
  },
  fileName: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  fileMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  fileBody: {
    rowGap: theme.spacing.md,
  },
  fileSummary: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  previewWrap: {
    backgroundColor: theme.colors.bg,
    borderRadius: theme.radius.md,
    maxHeight: 170,
    padding: theme.spacing.md,
  },
  previewText: {
    color: theme.colors.muted,
    fontFamily: 'Courier',
    fontSize: 12,
    lineHeight: 18,
  },
  tagRow: {
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  tag: {
    backgroundColor: theme.colors.accentDim,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  metaList: {
    rowGap: 8,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaKey: {
    color: theme.colors.muted,
    flex: 1,
    fontSize: 13,
  },
  metaValue: {
    color: theme.colors.text,
    fontFamily: 'Courier',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
})
