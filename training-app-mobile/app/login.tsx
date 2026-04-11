import { Redirect } from 'expo-router'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlossyCard } from '../src/components/ui/GlossyCard'
import { ActionButton } from '../src/components/ui/ActionButton'
import { AppLoadingScreen } from '../src/components/ui/AppLoadingScreen'
import { ScreenBackground } from '../src/components/ui/ScreenBackground'
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
      <AppLoadingScreen
        label="Auth"
        message="Восстанавливаем сохранённую авторизацию, чтобы не заставлять пользователя логиниться заново."
        title="Восстанавливаем сессию"
      />
    )
  }

  if (token && userName) {
    return <Redirect href="/(tabs)/calculator" />
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenBackground>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={styles.keyboard}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.hero}>
              <Text style={styles.heroLabel}>Training calculator</Text>
              <Text style={styles.heroTitle}>Единый mobile shell</Text>
              <Text style={styles.heroText}>
                Вход теперь выглядит как часть того же приложения: те же surface-слои, та же иерархия, тот же ритм spacing.
              </Text>

              <View style={styles.heroChips}>
                <View style={styles.heroChip}>
                  <Text style={styles.heroChipText}>Shared auth</Text>
                </View>
                <View style={styles.heroChip}>
                  <Text style={styles.heroChipText}>Expo router</Text>
                </View>
                <View style={styles.heroChip}>
                  <Text style={styles.heroChipText}>Glass UI</Text>
                </View>
              </View>
            </View>

            <GlossyCard contentStyle={styles.card} variant="accent">
              <View style={styles.tabs}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: authMode === 'login' }}
                  onPress={() => {
                    setAuthMode('login')
                    setAuthError('')
                  }}
                  style={({ pressed }) => [
                    styles.tab,
                    authMode === 'login' ? styles.tabActive : null,
                    pressed ? styles.tabPressed : null,
                  ]}
                >
                  <Text style={[styles.tabText, authMode === 'login' ? styles.tabTextActive : null]}>Войти</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: authMode === 'register' }}
                  onPress={() => {
                    setAuthMode('register')
                    setAuthError('')
                  }}
                  style={({ pressed }) => [
                    styles.tab,
                    authMode === 'register' ? styles.tabActive : null,
                    pressed ? styles.tabPressed : null,
                  ]}
                >
                  <Text style={[styles.tabText, authMode === 'register' ? styles.tabTextActive : null]}>Регистрация</Text>
                </Pressable>
              </View>

              <View style={styles.form}>
                <View style={styles.field}>
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
                </View>

                <View style={styles.field}>
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
                </View>

                {authMode === 'register' ? (
                  <View style={styles.field}>
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
                  </View>
                ) : null}

                {authError ? <Text style={styles.error}>{authError}</Text> : null}

                <ActionButton
                  disabled={authLoading}
                  label={authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
                  loading={authLoading}
                  onPress={() => void handleAuth()}
                />
              </View>
            </GlossyCard>

            <GlossyCard contentStyle={styles.noteCard}>
              <Text style={styles.noteTitle}>Что уже унифицировано</Text>
              <Text style={styles.noteBody}>
                Авторизация, tabs, training, calculator, files и theory теперь опираются на один background-layer и одну систему surface-компонентов.
              </Text>
            </GlossyCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.bg,
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
    rowGap: theme.spacing.lg,
  },
  hero: {
    borderLeftColor: theme.colors.accent,
    borderLeftWidth: 3,
    paddingLeft: theme.spacing.md,
    rowGap: theme.spacing.sm,
  },
  heroLabel: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: theme.colors.text,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 38,
  },
  heroText: {
    color: theme.colors.muted,
    fontSize: 16,
    lineHeight: 22,
  },
  heroChips: {
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: theme.spacing.sm,
  },
  heroChip: {
    backgroundColor: 'rgba(255,107,53,0.14)',
    borderColor: 'rgba(255,107,53,0.28)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  heroChipText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    padding: theme.spacing.lg,
    rowGap: theme.spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  tab: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 12,
  },
  tabActive: {
    backgroundColor: 'rgba(255,107,53,0.16)',
    borderColor: theme.colors.accent,
  },
  tabPressed: {
    opacity: 0.9,
  },
  tabText: {
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: '700',
  },
  tabTextActive: {
    color: theme.colors.text,
  },
  form: {
    rowGap: theme.spacing.md,
  },
  field: {
    rowGap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: theme.colors.glassBorder,
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
    lineHeight: 20,
  },
  noteCard: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.sm,
  },
  noteTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  noteBody: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
})
