import { Pressable, Text, TextInput, View } from 'react-native';

import { readinessFocusOptions } from '@/hooks/useReadinessScreen';
import { theme } from '@/theme/Theme';
import type { ReadinessFocus } from '@/types/readiness';

import { styles } from './ReadinessScreen.styles';

const weekOptions = [1, 2, 3] as const;

type FocusTabsProps = {
  focus: ReadinessFocus;
  onChange: (focus: ReadinessFocus) => void;
};

type WeekSelectorProps = {
  onChange: (week: number) => void;
  week: number;
};

type CoachNoteFormProps = {
  canSave: boolean;
  note: string;
  noteError: string | null;
  noteFocused: boolean;
  onBlur: () => void;
  onChange: (value: string) => void;
  onFocus: () => void;
  onSave: () => void;
  savedAt: string | null;
  saving: boolean;
};

export function FocusTabs({ focus, onChange }: FocusTabsProps) {
  return (
    <View style={styles.segmented} accessibilityRole="tablist">
      {readinessFocusOptions.map((option) => {
        const selected = option.value === focus;
        return (
          <Pressable
            accessibilityLabel={`Показать фокус ${option.label}`}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            hitSlop={theme.hitSlop.control}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.segment,
              selected && styles.segmentSelected,
              pressed && styles.segmentPressed,
            ]}
          >
            <Text style={[styles.segmentText, selected && styles.segmentTextSelected]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function WeekSelector({ onChange, week }: WeekSelectorProps) {
  return (
    <View style={styles.weekRow}>
      {weekOptions.map((option) => {
        const selected = option === week;
        return (
          <Pressable
            accessibilityLabel={`Неделя ${option}`}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            hitSlop={theme.hitSlop.control}
            key={option}
            onPress={() => onChange(option)}
            style={({ pressed }) => [
              styles.weekButton,
              selected && styles.weekButtonSelected,
              pressed && styles.segmentPressed,
            ]}
          >
            <Text style={[styles.weekText, selected && styles.segmentTextSelected]}>
              W{option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function CoachNoteForm(props: CoachNoteFormProps) {
  return (
    <View style={styles.form}>
      <Text style={styles.inputLabel}>Заметка тренера</Text>
      <TextInput
        accessibilityLabel="Заметка тренера по готовности"
        multiline
        onBlur={props.onBlur}
        onChangeText={props.onChange}
        onFocus={props.onFocus}
        placeholder="Например: оставить RPE 7 в первом упражнении"
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, props.noteFocused && styles.inputFocused, { maxHeight: 120 }]}
        value={props.note}
      />
      {props.noteError ? (
        <Text accessibilityLiveRegion="polite" style={styles.inlineError}>
          {props.noteError}
        </Text>
      ) : null}
      {props.savedAt ? <Text style={styles.saved}>{props.savedAt}</Text> : null}
      <Pressable
        accessibilityLabel="Сохранить заметку готовности"
        accessibilityRole="button"
        accessibilityState={{ busy: props.saving, disabled: !props.canSave }}
        disabled={!props.canSave}
        hitSlop={theme.hitSlop.control}
        onPress={props.onSave}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && props.canSave && styles.primaryButtonPressed,
          !props.canSave && styles.primaryButtonDisabled,
        ]}
      >
        <Text style={styles.primaryButtonText}>
          {props.saving ? 'Сохранение' : 'Сохранить'}
        </Text>
      </Pressable>
    </View>
  );
}
