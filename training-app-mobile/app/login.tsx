import { Redirect } from 'expo-router'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthSessionContext } from '../src/providers/AuthSessionProvider'
import { theme } from '../src/theme'

export default function LoginScreen() {
  const {
    token,
    userName,
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
  } = useAuthSessionContext()

  if (sessionLoading) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
        <Text style={styles.loadingText}>Восстанавливаем сессию…</Text>
      </SafeAreaView>
    )
  }

  if (token && userName) {
    return <Redirect href="/(tabs)/calculator" />
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.keyboard}
      >
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>Тренировочный калькулятор</Text>
          <Text style={styles.heroTitle}>Мобильная версия</Text>
          <Text style={styles.heroText}>
            Foundation-перенос готов: авторизация, theme, router и shared logic уже живут в Expo-подпроекте.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.tabs}>
            <Pressable
              style={[styles.tab, authMode === 'login' ? styles.tabActive : null]}
              onPress={() => {
                setAuthMode('login')
                setAuthError('')
              }}
            >
              <Text style={[styles.tabText, authMode === 'login' ? styles.tabTextActive : null]}>Войти</Text>
            </Pressable>
            <Pressable
              style={[styles.tab, authMode === 'register' ? styles.tabActive : null]}
              onPress={() => {
                setAuthMode('register')
                setAuthError('')
              }}
            >
              <Text style={[styles.tabText, authMode === 'register' ? styles.tabTextActive : null]}>Регистрация</Text>
            </Pressable>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Имя пользователя</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setNameInput}
              placeholder="steve"
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
              value={nameInput}
            />

            <Text style={styles.label}>Пароль</Text>
            <TextInput
              onChangeText={setPassInput}
              onSubmitEditing={() => void handleAuth()}
              placeholder="••••••"
              placeholderTextColor={theme.colors.muted}
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
                  placeholderTextColor={theme.colors.muted}
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
              style={({ pressed }) => [
                styles.submit,
                pressed ? styles.submitPressed : null,
                authLoading ? styles.submitDisabled : null,
              ]}
            >
              <Text style={styles.submitText}>
                {authLoading ? 'Подключаемся…' : authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  loadingScreen: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg,
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: theme.colors.muted,
    fontSize: 16,
    marginTop: theme.spacing.md,
  },
  hero: {
    borderLeftColor: theme.colors.accent,
    borderLeftWidth: 3,
    marginBottom: theme.spacing.xl,
    paddingLeft: theme.spacing.md,
  },
  heroLabel: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: theme.colors.text,
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 42,
  },
  heroText: {
    color: theme.colors.muted,
    fontSize: 16,
    lineHeight: 22,
    marginTop: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.md,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  tab: {
    alignItems: 'center',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 12,
  },
  tabActive: {
    backgroundColor: theme.colors.accentDim,
    borderColor: theme.colors.accent,
  },
  tabText: {
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: '600',
  },
  tabTextActive: {
    color: theme.colors.text,
  },
  form: {
    rowGap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 16,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
  },
  error: {
    color: theme.colors.red,
    fontSize: 14,
    marginTop: theme.spacing.sm,
  },
  submit: {
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.md,
    paddingVertical: 14,
  },
  submitPressed: {
    opacity: 0.9,
  },
  submitDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '800',
  },
})
