import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { InfoCard } from '../../src/components/InfoCard'
import { ScreenLayout } from '../../src/components/ScreenLayout'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'
import { theme } from '../../src/theme'
import type { FileWorkspaceResponse } from '../../src/types'
import { analyzeFileWorkspace, loadFileWorkspace } from '../../src/utils/api'

export default function FilesScreen() {
  const { token } = useAuthSessionContext()
  const [workspace, setWorkspace] = useState<FileWorkspaceResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function refresh(mode: 'load' | 'analyze' = 'load') {
    setLoading(true)
    setError('')
    try {
      const nextWorkspace = mode === 'load'
        ? await loadFileWorkspace(token)
        : await analyzeFileWorkspace(token)
      setWorkspace(nextWorkspace)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Не удалось получить workspace')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return
    void refresh('load')
  }, [token])

  return (
    <ScreenLayout
      label="Files"
      title="Workspace API подключён"
      subtitle="Полный файловый UI ещё впереди, но мобильный shell уже умеет читать и запускать анализ через тот же backend."
    >
      <InfoCard accentColor={theme.colors.blue} title="Состояние workspace">
        {workspace ? (
          <View style={{ rowGap: 10 }}>
            <Text style={{ color: theme.colors.text, fontSize: 15 }}>Файлов в inbox: {workspace.files.length}</Text>
            <Text style={{ color: theme.colors.text, fontSize: 15 }}>OCR модель: {workspace.ocr.model}</Text>
            <Text style={{ color: theme.colors.muted, fontSize: 13, lineHeight: 18 }}>
              {workspace.paths.inboxDir}
            </Text>
          </View>
        ) : (
          <Text style={{ color: theme.colors.muted, fontSize: 15 }}>
            {loading ? 'Запрашиваем состояние workspace…' : 'Данные ещё не загружены'}
          </Text>
        )}

        {error ? <Text style={{ color: theme.colors.red, fontSize: 14, marginTop: 12 }}>{error}</Text> : null}
      </InfoCard>

      <InfoCard title="Действия">
        <View style={{ columnGap: 12, flexDirection: 'row' }}>
          <Pressable onPress={() => void refresh('load')} style={({ pressed }) => [buttonStyles.ghost, pressed ? buttonStyles.pressed : null]}>
            <Text style={buttonStyles.ghostText}>{loading ? '...' : 'Обновить'}</Text>
          </Pressable>
          <Pressable onPress={() => void refresh('analyze')} style={({ pressed }) => [buttonStyles.primary, pressed ? buttonStyles.pressed : null]}>
            <Text style={buttonStyles.primaryText}>{loading ? '...' : 'Анализировать'}</Text>
          </Pressable>
        </View>
      </InfoCard>
    </ScreenLayout>
  )
}

const buttonStyles = {
  primary: {
    alignItems: 'center' as const,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    flex: 1,
    paddingVertical: 14,
  },
  primaryText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '800' as const,
  },
  ghost: {
    alignItems: 'center' as const,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 14,
  },
  ghostText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '700' as const,
  },
  pressed: {
    opacity: 0.85,
  },
}
