import { Animated, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ReadinessCard } from '@/components/ReadinessCard';
import { useReadinessScreen } from '@/hooks/useReadinessScreen';
import { theme } from '@/theme/Theme';
import type { ReadinessSnapshot } from '@/types/readiness';

import { CoachNoteForm, FocusTabs, WeekSelector } from './ReadinessScreen.parts';
import { styles } from './ReadinessScreen.styles';

type ReadinessScreenProps = {
  snapshot?: ReadinessSnapshot;
};

export function ReadinessScreen({ snapshot }: ReadinessScreenProps) {
  const logic = useReadinessScreen({ snapshot });
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: Math.max(insets.bottom, theme.spacing.xxl) },
          ]}
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
        >
          {logic.screenState.status === 'loading' ? (
            <View style={styles.stack}>
              <ReadinessCard label="Сон" state="loading" />
              <ReadinessCard label="Нагрузка" state="loading" />
              <ReadinessCard label="Мобилити" state="loading" />
            </View>
          ) : null}

          {logic.screenState.status === 'error' ? (
            <Text accessibilityLiveRegion="polite" style={styles.inlineError}>
              {logic.screenState.message}
            </Text>
          ) : null}

          {logic.screenState.status === 'ready' ? (
            <Animated.View style={[styles.stack, logic.revealStyle]}>
              <View style={styles.hero}>
                <Text style={styles.eyebrow}>
                  Readiness · {logic.screenState.snapshot.dateLabel}
                </Text>
                <Text style={styles.title}>Готовность {logic.screenState.snapshot.athleteName}</Text>
                <Text style={styles.summary}>{logic.screenState.snapshot.summary}</Text>
                <View
                  accessibilityLabel={`Индекс готовности ${logic.screenState.snapshot.score} из 100`}
                  accessibilityRole="summary"
                  style={styles.scoreRow}
                >
                  <Text style={styles.score}>{logic.screenState.snapshot.score}</Text>
                  <Text style={styles.scoreMeta}>/100</Text>
                </View>
              </View>

              <FocusTabs focus={logic.focus} onChange={logic.setFocus} />
              <WeekSelector onChange={logic.setWeek} week={logic.week} />

              <View style={styles.stack}>
                {logic.screenState.snapshot.metrics.map((metric) => (
                  <ReadinessCard
                    key={metric.id}
                    metric={metric}
                    onPress={logic.setFocus}
                    selected={metric.id === logic.focus}
                    state="ready"
                  />
                ))}
              </View>

              {logic.selectedMetric ? (
                <View style={styles.detail}>
                  <Text style={styles.detailLabel}>Фокус</Text>
                  <Text style={styles.detailTitle}>{logic.selectedMetric.label}</Text>
                  <Text style={styles.detailText}>{logic.selectedMetric.helper}</Text>
                </View>
              ) : null}

              <CoachNoteForm
                canSave={logic.canSave}
                note={logic.note}
                noteError={logic.noteError}
                noteFocused={logic.noteFocused}
                onBlur={logic.onNoteBlur}
                onChange={logic.onNoteChange}
                onFocus={logic.onNoteFocus}
                onSave={logic.saveNote}
                savedAt={logic.savedAt}
                saving={logic.saving}
              />
            </Animated.View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
