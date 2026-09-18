import type {PropsWithChildren} from 'react';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors, radius, spacing} from '../../theme';

interface ActionButtonProps extends PropsWithChildren {
  label?: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  disabled?: boolean;
}

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  children,
}: ActionButtonProps): React.JSX.Element {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        variantStyles[variant],
        disabled ? styles.disabled : null,
        pressed ? styles.pressed : null,
      ]}>
      {children ?? (
        <Text style={[styles.text, textStyles[variant]]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radius.md,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  text: {fontSize: 15, fontWeight: '800'},
  disabled: {opacity: 0.55},
  pressed: {opacity: 0.84},
});

const variantStyles = StyleSheet.create({
  primary: {backgroundColor: colors.accent},
  ghost: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
    borderWidth: 1,
  },
  danger: {
    backgroundColor: 'rgba(255,77,77,0.14)',
    borderColor: 'rgba(255,77,77,0.35)',
    borderWidth: 1,
  },
});

const textStyles = StyleSheet.create({
  primary: {color: '#111111'},
  ghost: {color: colors.text},
  danger: {color: colors.red},
});
