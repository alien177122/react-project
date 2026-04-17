import { motion } from 'framer-motion'
import { HeroSection } from '../components/ui/HeroSection'
import { PremiumInput } from '../components/ui/PremiumInput'
import { Button } from '../components/ui/Button'
import { fadeInScale } from '../theme/animations'

export interface AuthScreenProps {
  authMode: 'login' | 'register'
  setAuthMode: (value: 'login' | 'register') => void
  nameInput: string
  setNameInput: (value: string) => void
  passInput: string
  setPassInput: (value: string) => void
  pass2Input: string
  setPass2Input: (value: string) => void
  authError: string
  setAuthError: (value: string) => void
  authLoading: boolean
  handleAuth: () => void
}

export default function AuthScreen({
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
}: AuthScreenProps) {
  return (
    <>
      <HeroSection
        label="Тренировочный калькулятор"
        title="ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ"
        subtitle="Рассчитай рабочие веса на 8 недель по своему 1ПМ. Реальные схемы с волновой периодизацией."
      />

      <motion.div
        className="auth-card"
        variants={fadeInScale}
        initial="hidden"
        animate="show"
      >
        <div className="auth-tabs">
          <button
            className={`auth-tab${authMode === 'login' ? ' auth-tab-active' : ''}`}
            onClick={() => {
              setAuthMode('login')
              setAuthError('')
            }}
          >
            Войти
          </button>
          <button
            className={`auth-tab${authMode === 'register' ? ' auth-tab-active' : ''}`}
            onClick={() => {
              setAuthMode('register')
              setAuthError('')
            }}
          >
            Регистрация
          </button>
        </div>

        <div className="auth-form">
          <PremiumInput
            id="auth-name"
            label="Имя пользователя"
            placeholder="Стив"
            autoComplete="username"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
          />

          <PremiumInput
            id="auth-pass"
            label="Пароль"
            type="password"
            placeholder="••••••"
            autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
          />

          {authMode === 'register' && (
            <PremiumInput
              id="auth-pass2"
              label="Повторить пароль"
              type="password"
              placeholder="••••••"
              autoComplete="new-password"
              value={pass2Input}
              onChange={(e) => setPass2Input(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            />
          )}

          {authError && (
            <div className="auth-error" role="alert">
              {authError}
            </div>
          )}

          <Button
            style={{ width: '100%', marginTop: 8 }}
            onClick={handleAuth}
            disabled={authLoading}
          >
            {authLoading ? '...' : authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </Button>
        </div>
      </motion.div>
    </>
  )
}
