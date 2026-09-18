import {EXERCISES, SHORT_NAMES, WHEEL_ORDER} from '@training/shared/data/exercises';
import {useJournal} from '@training/shared/hooks/useJournal';
import {sessionPeak, sessionVolume} from '@training/shared/utils/journalMetrics';
import {useMemo, useState} from 'react';
import {FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Svg, {Polyline} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';

import {formatKg} from '@/lib/progressionWeeks';
import {useSession} from '@/session/SessionContext';
import {tokens} from '@/theme/tokens';

function Sparkline({points}: {points: {date: string; peak: number}[]}) {
  if (points.length < 2) {
    return <Text style={styles.hint}>Нужно ≥2 сессии для тренда peak e1RM.</Text>;
  }

  const peaks = points.map(point => point.peak);
  const min = Math.min(...peaks);
  const max = Math.max(...peaks);
  const span = Math.max(max - min, 1);
  const width = 280;
  const height = 64;
  const coords = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * (width - 8) + 4;
      const y = height - 4 - ((point.peak - min) / span) * (height - 8);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View style={styles.sparkWrap}>
      <Svg height={height} width="100%" viewBox={`0 0 ${width} ${height}`}>
        <Polyline fill="none" points={coords} stroke={tokens.colors.accent} strokeWidth="2" />
      </Svg>
      <Text style={styles.hint}>
        Peak e1RM: {formatKg(peaks[peaks.length - 1] ?? 0)} кг (последняя)
      </Text>
    </View>
  );
}

export default function JournalScreen() {
  const {userData, token, persistUserData, setUserData} = useSession();
  const savedKeys = userData?.exercises.map(item => item.exerciseKey) ?? [];
  const defaultKey = savedKeys[0] ?? WHEEL_ORDER[0] ?? 'bench';
  const [exerciseKey, setExerciseKey] = useState(defaultKey);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saveError, setSaveError] = useState('');

  const journal = useJournal({
    userData: userData ?? {name: 'Атлет', exercises: []},
    exerciseKey,
    setUserData: value => setUserData(value),
    saveUser: async data => persistUserData(data),
    token: token || 'guest',
    onSaveError: message => setSaveError(message),
  });

  const exerciseName = EXERCISES[exerciseKey]?.name ?? exerciseKey;

  const pickerItems = useMemo(() => {
    const keys = savedKeys.length > 0 ? savedKeys : WHEEL_ORDER;
    return keys
      .filter(key => EXERCISES[key])
      .map(key => ({
        key,
        name: EXERCISES[key]?.name ?? key,
      }));
  }, [savedKeys]);

  if (!userData) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <View style={styles.center}>
          <Text style={styles.muted}>Загружаем журнал…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <FlatList
        data={journal.history}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Журнал</Text>
              <Text style={styles.title}>Сессии</Text>
              <Text style={styles.subtitle}>Подходы, RPE и peak e1RM по упражнению.</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => setPickerOpen(true)}
              style={({pressed}) => [styles.pickerButton, pressed && styles.pressed]}>
              <Text style={styles.exerciseName}>{exerciseName}</Text>
              <Text style={styles.accent}>Сменить</Text>
            </Pressable>

            <View style={styles.card}>
              <Text style={styles.sectionLabel}>Тренд</Text>
              <Sparkline points={journal.chartPoints} />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionLabel}>
                {journal.editingSessionId ? 'Редактирование' : 'Сегодня'}
              </Text>

              {journal.draftSets.map((set, index) => (
                <View key={set.id} style={styles.draftRow}>
                  <TextInput
                    accessibilityLabel={`Вес подхода ${index + 1}`}
                    inputMode="decimal"
                    keyboardType="decimal-pad"
                    onChangeText={value => journal.updateDraftSet(index, {weight: value})}
                    placeholder="кг"
                    placeholderTextColor={tokens.colors.textTertiary}
                    style={styles.draftInput}
                    value={set.weight}
                  />
                  <TextInput
                    accessibilityLabel={`Повторы подхода ${index + 1}`}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    onChangeText={value => journal.updateDraftSet(index, {reps: value})}
                    placeholder="повт"
                    placeholderTextColor={tokens.colors.textTertiary}
                    style={styles.draftInput}
                    value={set.reps}
                  />
                  <TextInput
                    accessibilityLabel={`RPE подхода ${index + 1}`}
                    inputMode="decimal"
                    keyboardType="decimal-pad"
                    onChangeText={value => journal.updateDraftSet(index, {rpe: value})}
                    placeholder="RPE"
                    placeholderTextColor={tokens.colors.textTertiary}
                    style={styles.draftInputSmall}
                    value={set.rpe}
                  />
                  <Pressable
                    accessibilityRole="button"
                    hitSlop={8}
                    onPress={() => journal.removeDraftSet(index)}>
                    <Text style={styles.deleteText}>×</Text>
                  </Pressable>
                </View>
              ))}

              <TextInput
                accessibilityLabel="Заметка к сессии"
                onChangeText={journal.setSessionNote}
                placeholder="Заметка к сессии"
                placeholderTextColor={tokens.colors.textTertiary}
                style={styles.noteInput}
                value={journal.sessionNote}
              />

              {saveError ? <Text style={styles.error}>{saveError}</Text> : null}

              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  onPress={journal.addDraftRow}
                  style={({pressed}) => [styles.ghostButton, pressed && styles.pressed]}>
                  <Text style={styles.ghostText}>+ Подход</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={journal.copyLastSession}
                  style={({pressed}) => [styles.ghostButton, pressed && styles.pressed]}>
                  <Text style={styles.ghostText}>Как в прошлый</Text>
                </Pressable>
              </View>

              <Pressable
                accessibilityRole="button"
                disabled={journal.saving}
                onPress={() => {
                  setSaveError('');
                  void journal.saveSession();
                }}
                style={({pressed}) => [
                  styles.primaryButton,
                  pressed && styles.pressed,
                  journal.saving && styles.disabled,
                ]}>
                <Text style={styles.primaryText}>
                  {journal.saving ? 'Сохраняем…' : 'Сохранить сессию'}
                </Text>
              </Pressable>

              {journal.editingSessionId ? (
                <Pressable accessibilityRole="button" onPress={journal.cancelEdit}>
                  <Text style={styles.accent}>Отменить редактирование</Text>
                </Pressable>
              ) : null}
            </View>

            <Text style={styles.sectionLabel}>История</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Нет сессий</Text>
            <Text style={styles.hint}>Добавьте подходы и сохраните первую сессию.</Text>
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.flex}>
                <Text style={styles.resultTitle}>{item.date}</Text>
                <Text style={styles.hint}>
                  Peak {formatKg(sessionPeak(item.sets))} · объём{' '}
                  {formatKg(sessionVolume(item.sets))} · {item.sets.length} подх.
                </Text>
              </View>
            </View>
            {item.sets.map(set => (
              <Text key={set.setIndex} style={styles.hint}>
                {set.setIndex}. {formatKg(set.weight)} кг × {set.reps}
                {set.rpe != null ? ` · RPE ${set.rpe}` : ''}
              </Text>
            ))}
            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => journal.loadSessionIntoDraft(item)}>
                <Text style={styles.accent}>Изменить</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  void journal.deleteSession(item.id);
                }}>
                <Text style={styles.deleteText}>Удалить</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <Modal animationType="slide" onRequestClose={() => setPickerOpen(false)} visible={pickerOpen}>
        <SafeAreaView style={styles.modalScreen}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Упражнение</Text>
            <Pressable onPress={() => setPickerOpen(false)}>
              <Text style={styles.accent}>Закрыть</Text>
            </Pressable>
          </View>
          <FlatList
            data={pickerItems}
            keyExtractor={item => item.key}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  setExerciseKey(item.key);
                  setPickerOpen(false);
                }}
                style={({pressed}) => [
                  styles.resultCard,
                  item.key === exerciseKey && styles.selectedCard,
                  pressed && styles.pressed,
                ]}>
                <Text style={styles.resultTitle}>{item.name}</Text>
                <Text style={styles.hint}>{SHORT_NAMES[item.key] ?? item.key}</Text>
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: tokens.colors.bg},
  modalScreen: {flex: 1, backgroundColor: tokens.colors.bg},
  content: {padding: tokens.spacing.md, paddingBottom: tokens.spacing.xxl, gap: tokens.spacing.sm},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  stack: {gap: tokens.spacing.md, marginBottom: tokens.spacing.sm},
  hero: {gap: tokens.spacing.sm, paddingTop: tokens.spacing.sm},
  eyebrow: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {color: tokens.colors.text, fontSize: tokens.fontSize.xxl, fontWeight: '600'},
  subtitle: {color: tokens.colors.textSecondary, fontSize: tokens.fontSize.md, lineHeight: 24},
  card: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  sectionLabel: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  pickerButton: {
    alignItems: 'center',
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: tokens.spacing.md,
  },
  exerciseName: {color: tokens.colors.text, fontSize: tokens.fontSize.lg, fontWeight: '600'},
  accent: {color: tokens.colors.accent, fontSize: tokens.fontSize.sm, fontWeight: '600'},
  sparkWrap: {gap: tokens.spacing.sm},
  draftRow: {alignItems: 'center', flexDirection: 'row', gap: tokens.spacing.sm},
  draftInput: {
    backgroundColor: tokens.colors.bg,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    color: tokens.colors.text,
    flex: 1,
    minHeight: 44,
    paddingHorizontal: tokens.spacing.sm,
  },
  draftInputSmall: {
    backgroundColor: tokens.colors.bg,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    color: tokens.colors.text,
    minHeight: 44,
    paddingHorizontal: tokens.spacing.sm,
    width: 64,
  },
  noteInput: {
    backgroundColor: tokens.colors.bg,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    color: tokens.colors.text,
    minHeight: 44,
    paddingHorizontal: tokens.spacing.md,
  },
  actions: {flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm},
  primaryButton: {
    alignItems: 'center',
    backgroundColor: tokens.colors.accent,
    borderRadius: tokens.radius.md,
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryText: {color: tokens.colors.bg, fontSize: tokens.fontSize.md, fontWeight: '600'},
  ghostButton: {
    alignItems: 'center',
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: tokens.spacing.md,
  },
  ghostText: {color: tokens.colors.text, fontSize: tokens.fontSize.sm, fontWeight: '500'},
  resultCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    gap: tokens.spacing.xs,
    padding: tokens.spacing.md,
  },
  selectedCard: {borderColor: tokens.colors.accent},
  resultHeader: {flexDirection: 'row'},
  resultTitle: {color: tokens.colors.text, fontSize: tokens.fontSize.md, fontWeight: '600'},
  emptyCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.lg,
  },
  emptyTitle: {color: tokens.colors.text, fontSize: tokens.fontSize.md, fontWeight: '600'},
  hint: {color: tokens.colors.textSecondary, fontSize: tokens.fontSize.sm, lineHeight: 20},
  error: {color: tokens.colors.danger, fontSize: tokens.fontSize.sm},
  deleteText: {color: tokens.colors.danger, fontSize: tokens.fontSize.sm, fontWeight: '600'},
  muted: {color: tokens.colors.textSecondary, fontSize: tokens.fontSize.md},
  pressed: {opacity: 0.9, transform: [{scale: 0.98}]},
  disabled: {opacity: 0.4},
  flex: {flex: 1, gap: 4},
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: tokens.spacing.md,
  },
});
