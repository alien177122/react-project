import { Redirect } from 'expo-router'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActionButton } from '../src/components/ui/ActionButton'
import { AppLoadingScreen } from '../src/components/ui/AppLoadingScreen'
import { IOSInput } from '../src/components/ui/IOSInput'
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
        message="Восстанавливаем сохранённую авторизацию."
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
            contentContainerStyle={[
              styles.content,
              Platform.OS === 'web' && styles.contentWeb,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Large Title hero */}
            <View style={styles.hero}>
              <Text style={styles.heroEyebrow}>Training calculator</Text>
              <Text style={styles.heroTitle}>
                {authMode === 'login' ? 'Вход' : 'Регистрация'}
              </Text>
              <Text style={styles.heroSubtitle}>
                Войдите, чтобы открыть персональный план тренировок на 8 недель
              </Text>
            </View>

            {/* Form card */}
            <View style={styles.formCard}>
              {/* iOS Segmented Control */}
              <View style={styles.segControl}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: authMode === 'login' }}
                  onPress={() => { setAuthMode('login'); setAuthError('') }}
                  style={[styles.segment, authMode === 'login' && styles.segmentActive]}
                >
                  <Text style={[styles.segText, authMode === 'login' && styles.segTextActive]}>
                    Войти
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: authMode === 'register' }}
                  onPress={() => { setAuthMode('register'); setAuthError('') }}
                  style={[styles.segment, authMode === 'register' && styles.segmentActive]}
                >
                  <Text style={[styles.segText, authMode === 'register' && styles.segTextActive]}>
                    Регистрация
                  </Text>
                </Pressable>
              </View>

              {/* Fields */}
              <View style={styles.fields}>
                <IOSInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  label="Имя пользователя"
                  onChangeText={setNameInput}
                  placeholder="steve"
                  value={nameInput}
                />
                <IOSInput
                  label="Пароль"
                  onChangeText={setPassInput}
                  onSubmitEditing={() => void handleAuth()}
                  placeholder="••••••"
                  secureTextEntry
                  value={passInput}
                />
                {authMode === 'register' ? (
                  <IOSInput
                    label="Повторить пароль"
                    onChangeText={setPass2Input}
                    onSubmitEditing={() => void handleAuth()}
                    placeholder="••••••"
                    secureTextEntry
                    value={pass2Input}
                  />
                ) : null}

                {authError ? <Text style={styles.error}>{authError}</Text> : null}

                <ActionButton
                  disabled={authLoading}
                  label={authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
                  loading={authLoading}
                  onPress={() => void handleAuth()}
                />
              </View>
            </View>
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
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    rowGap: 28,
    width: '100%',
  },
  contentWeb: {
    justifyContent: 'flex-start',
    paddingBottom: 96,
    paddingTop: 160,
  },

  // Large Title hero
  hero: {
    rowGap: 6,
    width: '100%',
    maxWidth: 520,
  },
  heroEyebrow: {
    color: theme.colors.orange,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.37,
    lineHeight: 41,
  },
  heroSubtitle: {
    color: '#8E8E93',
    fontSize: 15,
    lineHeight: 20,
    marginTop: 2,
  },

  // Form container (Inset Grouped)
  formCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    borderColor: theme.colors.border,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 20,
    rowGap: 20,
    width: '100%',
    maxWidth: 520,
  },

  // iOS Segmented Control
  segControl: {
    backgroundColor: 'rgba(118,118,128,0.24)',
    borderRadius: 9,
    flexDirection: 'row',
    padding: 2,
  },
  segment: {
    alignItems: 'center',
    borderRadius: 7,
    flex: 1,
    paddingVertical: 8,
  },
  segmentActive: {
    backgroundColor: '#3A3A3C',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  segText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
  },
  segTextActive: {
    color: '#FFFFFF',
  },

  // Fields
  fields: {
    rowGap: 16,
  },
  error: {
    color: theme.colors.red,
    fontSize: 14,
    lineHeight: 20,
    marginTop: -4,
  },
})
