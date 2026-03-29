import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import type {
  FileWorkspaceResponse,
  WorkspaceFileEntry,
} from '@training/shared/types';

import {ScreenLayout} from '../components/ScreenLayout';
import {ActionButton} from '../components/ui/ActionButton';
import {SectionBlock} from '../components/ui/SectionBlock';
import {
  analyzeFileWorkspace,
  analyzeSingleWorkspaceFile,
  loadFileWorkspace,
} from '../platform/api';
import {useAuthContext} from '../providers/AuthProvider';
import {colors, radius, spacing} from '../theme';

export function FilesScreen(): React.JSX.Element {
  const {token} = useAuthContext();
  const [workspace, setWorkspace] = useState<FileWorkspaceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeFile, setActiveFile] = useState('');
  const [error, setError] = useState('');

  async function refresh(mode: 'load' | 'analyze' = 'load') {
    if (mode === 'analyze') setAnalyzing(true);
    else setLoading(true);

    setError('');
    try {
      const nextWorkspace =
        mode === 'load'
          ? await loadFileWorkspace(token)
          : await analyzeFileWorkspace(token);
      setWorkspace(nextWorkspace);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'Не удалось загрузить файловый раздел',
      );
    } finally {
      if (mode === 'analyze') setAnalyzing(false);
      else setLoading(false);
    }
  }

  async function analyzeOne(fileName: string) {
    setActiveFile(fileName);
    setError('');
    try {
      const nextWorkspace = await analyzeSingleWorkspaceFile(token, fileName);
      setWorkspace(nextWorkspace);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : `Не удалось проанализировать ${fileName}`,
      );
    } finally {
      setActiveFile('');
    }
  }

  useEffect(() => {
    if (!token) return;
    void refresh('load');
  }, [token]);

  function renderFileCard(file: WorkspaceFileEntry) {
    return (
      <View key={file.name} style={styles.fileCard}>
        <View style={styles.fileHead}>
          <View style={styles.fileHeadText}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text style={styles.fileMeta}>
              {file.extension} · {file.sizeLabel} ·{' '}
              {new Date(file.modifiedAt).toLocaleString('ru-RU')}
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
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.previewWrap}>
                <Text style={styles.previewText}>{file.analysis.preview}</Text>
              </ScrollView>
            ) : null}

            <View style={styles.tagRow}>
              {file.analysis.suggestedUse.map(tag => (
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
              Для файла ещё нет анализа. Положи его в `workspace-files/inbox` и
              запусти анализ.
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <ScreenLayout
      label="Files"
      title="Файлы и анализ"
      subtitle="Добавляй файлы во входящие, запускай анализ и смотри сводку, превью и OCR-результаты в одном месте.">
      <SectionBlock num="01" title="Файловый раздел">
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Клади файлы в `workspace-files/inbox`. Система сохранит анализ в
            `workspace-files/analysis` и покажет результаты в приложении.
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
            <Text style={styles.noteText}>Загрузка файлов...</Text>
          </View>
        ) : !workspace ? (
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>Данные пока недоступны.</Text>
          </View>
        ) : (
          <>
            <View style={styles.infoCard}>
              <Text style={styles.infoLine}>Inbox: {workspace.paths.inboxDir}</Text>
              <Text style={styles.infoLine}>
                Analysis: {workspace.paths.analysisDir}
              </Text>
              <Text style={styles.infoLine}>
                OCR: {workspace.ocr.model} · {workspace.ocr.baseUrl}
              </Text>
              <Text style={styles.infoLine}>
                Файлов найдено: {workspace.files.length}
              </Text>
            </View>

            {!workspace.files.length ? (
              <View style={styles.noteBox}>
                <Text style={styles.noteText}>
                  В `workspace-files/inbox` пока пусто. Добавь туда `.txt`,
                  `.md`, `.json`, `.csv`, изображения или PDF.
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
  );
}

const styles = StyleSheet.create({
  noteBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  noteText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  toolbar: {
    columnGap: spacing.md,
    flexDirection: 'row',
  },
  error: {
    color: colors.red,
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    rowGap: 8,
  },
  infoLine: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  filesGrid: {
    rowGap: spacing.md,
  },
  fileCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    rowGap: spacing.md,
  },
  fileHead: {
    alignItems: 'flex-start',
    columnGap: spacing.md,
    flexDirection: 'row',
  },
  fileHeadText: {
    flex: 1,
    rowGap: 6,
  },
  fileName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  fileMeta: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  fileBody: {
    rowGap: spacing.md,
  },
  fileSummary: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  previewWrap: {
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    maxHeight: 170,
    padding: spacing.md,
  },
  previewText: {
    color: colors.muted,
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
    backgroundColor: colors.accentDim,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: colors.text,
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
    color: colors.muted,
    flex: 1,
    fontSize: 13,
  },
  metaValue: {
    color: colors.text,
    fontFamily: 'Courier',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
});
