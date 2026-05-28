import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

import { theme } from '@/theme/Theme';

import { useReducedMotionPreference } from './useReducedMotionPreference';

type UseReadinessCardLogicInput = {
  disabled: boolean;
  loading: boolean;
  selected: boolean;
};

export function useReadinessCardLogic({ disabled, loading, selected }: UseReadinessCardLogicInput) {
  const reducedMotion = useReducedMotionPreference();
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reveal = useRef(new Animated.Value(loading ? 0 : 1)).current;

  useEffect(() => {
    if (reducedMotion) {
      reveal.setValue(1);
      return;
    }

    Animated.timing(reveal, {
      duration: theme.motion.duration.micro,
      easing: Easing.bezier(...theme.motion.easing.reveal),
      toValue: loading ? 0.72 : 1,
      useNativeDriver: true,
    }).start();
  }, [loading, reducedMotion, reveal]);

  const handlers = useMemo(
    () => ({
      onBlur: () => setFocused(false),
      onFocus: () => setFocused(true),
      onHoverIn: () => setHovered(true),
      onHoverOut: () => setHovered(false),
    }),
    [],
  );

  return {
    animatedStyle: {
      opacity: disabled ? 0.56 : reveal,
      transform: [{ scale: selected && !reducedMotion ? 1.01 : 1 }],
    },
    focused,
    handlers,
    hovered,
  };
}
