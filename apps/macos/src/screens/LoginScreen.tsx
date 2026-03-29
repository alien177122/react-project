import React from 'react';
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
import {useAuthContext} from '../providers/AuthProvider';
import {colors, radius, spacing} from '../theme';

export function LoginScreen(): React.JSX.Element {
  const {
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
    setAuthError,
    authLoading,
    handleAuth,
  } = useAuthContext();

  if (sessionLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Восстанавливаем сессию…</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios' || Platform.OS === 'macos'
            ? 'padding'
            : undefined
        }
        style={styles.keyboard}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.heroLabel}>Тренировочный калькулятор</Text>
            <Text style={styles.heroTitle}>Вход в аккаунт</Text>
            <Text style={styles.heroText}>
              Авторизуйся, чтобы открыть калькулятор, программу тренировок,
              теорию и раздел файлов.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.tabs}>
              <Pressable
                style={[
                  styles.tab,
                  authMode === 'login' ? styles.tabActive : null,
                ]}
                onPress={() => {
                  setAuthMode('login');
                  setAuthError('');
                }}>
                <Text
                  style={[
                    styles.tabText,
                    authMode === 'login' ? styles.tabTextActive : null,
                  ]}>
                  Войти
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.tab,
                  authMode === 'register' ? styles.tabActive : null,
                ]}
                onPress={() => {
                  setAuthMode('register');
                  setAuthError('');
                }}>
                <Text
                  style={[
                    styles.tabText,
                    authMode === 'register' ? styles.tabTextActive : null,
                  ]}>
                  Регистрация
                </Text>
              </Pressable>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Имя пользователя</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setNameInput}
                placeholder="steve"
                placeholderTextColor={colors.muted}
                style={styles.input}
                value={nameInput}
              />

              <Text style={styles.label}>Пароль</Text>
              <TextInput
                onChangeText={setPassInput}
                onSubmitEditing={() => void handleAuth()}
                placeholder="••••••"
                placeholderTextColor={colors.muted}
                secureTextEntry
                style={styles.input}
                value={passInput}
              />

              {authMode === 'register' ? (
                <>
                  <Text style={styles.label}>Повторить пароль</Text>
                  <TextInput
                    onChangeText={setPass2Input}
                    onSubmitEditing={() => void handleAuth()}
                    placeholder="••••••"
                    placeholderTextColor={colors.muted}
                    secureTextEntry
                    style={styles.input}
                    value={pass2Input}
                  />
                </>
              ) : null}

              {authError ? <Text style={styles.error}>{authError}</Text> : null}

              <Pressable
                disabled={authLoading}
                onPress={() => void handleAuth()}
                style={({pressed}) => [
                  styles.submit,
                  pressed ? styles.submitPressed : null,
                  authLoading ? styles.submitDisabled : null,
                ]}>
                <Text style={styles.submitText}>
                  {authLoading
                    ? 'Подключаемся…'
                    : authMode === 'login'
                      ? 'Войти'
                      : 'Создать аккаунт'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.bg},
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  content: {
    alignSelf: 'center',
    maxWidth: 440,
    width: '100%',
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  loadingText: {color: colors.muted, fontSize: 16, marginTop: spacing.md},
  hero: {
    borderLeftColor: colors.accent,
    borderLeftWidth: 3,
    marginBottom: spacing.xl,
    paddingLeft: spacing.md,
  },
  heroLabel: {
    color: colors.orange,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 42,
  },
  heroText: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  tabs: {flexDirection: 'row', marginBottom: spacing.lg},
  tab: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 12,
  },
  tabActive: {
    backgroundColor: colors.accentDim,
    borderColor: colors.accent,
  },
  tabText: {color: colors.muted, fontSize: 15, fontWeight: '600'},
  tabTextActive: {color: colors.text},
  form: {gap: spacing.sm},
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  error: {color: colors.red, fontSize: 14, marginTop: spacing.sm},
  submit: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    marginTop: spacing.md,
    paddingVertical: 14,
  },
  submitPressed: {opacity: 0.9},
  submitDisabled: {opacity: 0.6},
  submitText: {color: '#111111', fontSize: 16, fontWeight: '800'},
});
