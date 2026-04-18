import { useState } from 'react'
import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native'

interface IOSInputProps extends TextInputProps {
  label?: string
}

export function IOSInput({ label, style, onFocus, onBlur, ...props }: IOSInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...props}
        placeholderTextColor="#636366"
        style={[styles.input, focused && styles.inputFocused, style]}
        onFocus={(e) => { setFocused(true); onFocus?.(e) }}
        onBlur={(e) => { setFocused(false); onBlur?.(e) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 6,
  },
  label: {
    color: '#8E8E93',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 17,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputFocused: {
    backgroundColor: '#2C2C2E',
  },
})
