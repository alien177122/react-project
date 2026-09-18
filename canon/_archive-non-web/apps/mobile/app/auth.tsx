import {useSession} from '@/session/SessionContext';
import {tokens} from '@/theme/tokens';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Redirect, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function AuthScreen() {
  const session = useSession();
  const [guestLoading, setGuestLoading] = useState(false);

  const {
    token,
    isGuest,
    sessionLoading,
    authMode,
    setAuthMode,
    nameInput,
    setNameInput,
    passInput,
    setPassInput,
    pass2Input,
    setPass2Input,
    authError,
    authLoading,
    handleAuth,
    enterGuest,
    apiBaseUrl,
  } = session;

  const onGuest = useCallback(async () => {
    setGuestLoading(true);
    try {
      await enterGuest();
    } finally {
      setGuestLoading(false);
    }
  }, [enterGuest]);

  if (!sessionLoading && (token || isGuest)) {
    return <Redirect href={'/(tabs)' as Href} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={styles.content}>
          <Text style={styles.eyebrow}>Strength Calculator</Text>
          <Text style={styles.title}>{authMode === 'login' ? 'Вход' : 'Регистрация'}</Text>
          <Text style={styles.subtitle}>
            Данные синкаются с API. Можно продолжить офлайн — журнал и 1ПМ останутся на устройстве.
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Имя</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setNameInput}
              placeholder="Атлет"
              placeholderTextColor={tokens.colors.textTertiary}
              style={styles.input}
              value={nameInput}
            />

            <Text style={styles.label}>Пароль</Text>
            <TextInput
              onChangeText={setPassInput}
              placeholder="••••••••"
              placeholderTextColor={tokens.colors.textTertiary}
              secureTextEntry
              style={styles.input}
              value={passInput}
            />

            {authMode === 'register' ? (
              <>
                <Text style={styles.label}>Повтор пароля</Text>
                <TextInput
                  onChangeText={setPass2Input}
                  placeholder="••••••••"
                  placeholderTextColor={tokens.colors.textTertiary}
                  secureTextEntry
                  style={styles.input}
                  value={pass2Input}
                />
              </>
            ) : null}

            {authError ? <Text style={styles.error}>{authError}</Text> : null}

            <Pressable
              accessibilityRole="button"
              disabled={authLoading}
              onPress={() => {
                void handleAuth();
              }}
              style={({pressed}) => [
                styles.primaryButton,
                pressed && styles.pressed,
                authLoading && styles.disabled,
              ]}>
              {authLoading ? (
                <ActivityIndicator color={tokens.colors.bg} />
              ) : (
                <Text style={styles.primaryText}>
                  {authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
                </Text>
              )}
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              style={styles.linkButton}>
              <Text style={styles.linkText}>
                {authMode === 'login' ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Вход'}
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              disabled={guestLoading}
              onPress={() => {
                void onGuest();
              }}
              style={({pressed}) => [styles.ghostButton, pressed && styles.pressed]}>
              <Text style={styles.ghostText}>
                {guestLoading ? 'Открываем…' : 'Продолжить без аккаунта'}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.meta}>API: {apiBaseUrl}</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.bg,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: tokens.spacing.md,
    gap: tokens.spacing.md,
  },
  eyebrow: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.xxl,
    fontWeight: '600',
  },
  subtitle: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.md,
    lineHeight: 24,
  },
  card: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  label: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    fontWeight: '500',
    marginTop: tokens.spacing.xs,
  },
  input: {
    backgroundColor: tokens.colors.bg,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    minHeight: 48,
    paddingHorizontal: tokens.spacing.md,
  },
  error: {
    color: tokens.colors.danger,
    fontSize: tokens.fontSize.sm,
    lineHeight: 20,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: tokens.colors.accent,
    borderRadius: tokens.radius.md,
    justifyContent: 'center',
    minHeight: 48,
    marginTop: tokens.spacing.sm,
  },
  primaryText: {
    color: tokens.colors.bg,
    fontSize: tokens.fontSize.md,
    fontWeight: '600',
  },
  ghostButton: {
    alignItems: 'center',
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  ghostText: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    fontWeight: '500',
  },
  linkButton: {
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  linkText: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
  },
  pressed: {
    opacity: 0.88,
    transform: [{scale: 0.98}],
  },
  disabled: {
    opacity: 0.4,
  },
  meta: {
    color: tokens.colors.textTertiary,
    fontSize: tokens.fontSize.xs,
  },
});
