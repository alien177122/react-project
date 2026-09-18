import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

import { mockReadinessSnapshot } from '@/mocks/readiness';
import { theme } from '@/theme/Theme';
import type {
  ReadinessFocus,
  ReadinessMetric,
  ReadinessScreenState,
  ReadinessSnapshot,
} from '@/types/readiness';

import { useReducedMotionPreference } from './useReducedMotionPreference';

export const readinessFocusOptions: ReadonlyArray<{ label: string; value: ReadinessFocus }> = [
  { label: 'Сон', value: 'sleep' },
  { label: 'Нагрузка', value: 'load' },
  { label: 'Мобилити', value: 'mobility' },
];

type RouteParams = {
  focus?: string;
  week?: string;
};

type UseReadinessScreenInput = {
  snapshot?: ReadinessSnapshot;
};

function parseFocus(value: string | undefined): ReadinessFocus {
  return readinessFocusOptions.some((item) => item.value === value)
    ? (value as ReadinessFocus)
    : 'sleep';
}

function parseWeek(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function validateNote(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) return 'Добавьте короткую заметку перед сохранением.';
  if (trimmed.length < 8) return 'Минимум 8 символов.';
  if (trimmed.length > 140) return 'До 140 символов.';
  return null;
}

export function useReadinessScreen({ snapshot = mockReadinessSnapshot }: UseReadinessScreenInput) {
  const router = useRouter();
  const params = useLocalSearchParams<RouteParams>();
  const reducedMotion = useReducedMotionPreference();
  const revealRef = useRef<Animated.Value | null>(null);
  if (revealRef.current === null) {
    revealRef.current = new Animated.Value(0);
  }
  const reveal = revealRef.current;
  const [screenState, setScreenState] = useState<ReadinessScreenState>({ status: 'loading' });
  const [note, setNote] = useState('');
  const [noteError, setNoteError] = useState<string | null>(null);
  const [noteFocused, setNoteFocused] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const [prevSnapshot, setPrevSnapshot] = useState(snapshot);
  if (snapshot !== prevSnapshot) {
    setPrevSnapshot(snapshot);
    setScreenState({ status: 'loading' });
  }

  const focus = parseFocus(typeof params.focus === 'string' ? params.focus : undefined);
  const week = parseWeek(typeof params.week === 'string' ? params.week : undefined);

  useEffect(() => {
    if (screenState.status !== 'loading') return;
    const timer = setTimeout(() => {
      setScreenState({ snapshot, status: 'ready' });
    }, theme.motion.duration.micro);

    return () => clearTimeout(timer);
  }, [screenState.status, snapshot]);

  useEffect(() => {
    if (screenState.status !== 'ready') return;
    if (reducedMotion) {
      reveal.setValue(1);
      return;
    }

    Animated.timing(reveal, {
      duration: theme.motion.duration.macro,
      easing: Easing.bezier(...theme.motion.easing.reveal),
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [reducedMotion, reveal, screenState.status]);

  const selectedMetric = useMemo<ReadinessMetric | undefined>(() => {
    if (screenState.status !== 'ready') return undefined;
    return screenState.snapshot.metrics.find((metric) => metric.id === focus);
  }, [focus, screenState]);

  const setFocus = useCallback(
    (nextFocus: ReadinessFocus) => {
      router.setParams({ focus: nextFocus, week: String(week) });
    },
    [router, week],
  );

  const setWeek = useCallback(
    (nextWeek: number) => {
      router.setParams({ focus, week: String(nextWeek) });
    },
    [focus, router],
  );

  const onNoteBlur = useCallback(() => {
    setNoteFocused(false);
    setNoteError(validateNote(note));
  }, [note]);

  const onNoteFocus = useCallback(() => {
    setNoteFocused(true);
  }, []);

  const saveNote = useCallback(async () => {
    const error = validateNote(note);
    setNoteError(error);
    if (error || saving) return;

    setSaving(true);
    await new Promise<void>((resolve) => {
      setTimeout(resolve, theme.motion.duration.macro);
    });
    setSavedAt('Сохранено локально');
    setSaving(false);
  }, [note, saving]);

  return {
    canSave: validateNote(note) === null && !saving,
    focus,
    note,
    noteError,
    noteFocused,
    onNoteBlur,
    onNoteChange: setNote,
    onNoteFocus,
    revealStyle: {
      opacity: reveal,
      transform: [
        {
          translateY: reveal.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.spacing.sm, 0],
          }),
        },
      ],
    },
    saveNote,
    savedAt,
    saving,
    screenState,
    selectedMetric,
    setFocus,
    setWeek,
    week,
  };
}
