import { motion } from 'framer-motion'
import { PremiumInput } from '../components/ui/PremiumInput'
import { Button } from '../components/ui/Button'
import { fadeInScale } from '../theme/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

const AUTH_PLAN_WEEKS = Array.from({ length: 8 }, (_, index) => index + 1)

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
  const reduced = useReducedMotion()

  return (
    <main className="auth-screen" aria-label="Вход в тренировочный калькулятор">
      <div className="auth-stage">
        <motion.div
          className="auth-motion"
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="auth-motion__brand">Тренировочный калькулятор</div>
          <div className="auth-motion__timeline">
            {AUTH_PLAN_WEEKS.map((week) => (
              <span className="auth-motion__week" key={week}>
                <span className="auth-motion__bar" />
                <span className="auth-motion__number">{week}</span>
              </span>
            ))}
          </div>
          <div className="auth-motion__caption">8 недель персонального плана</div>
        </motion.div>

        <motion.div
          className="auth-card"
          variants={reduced ? undefined : fadeInScale}
          initial={reduced ? false : 'hidden'}
          animate={reduced ? undefined : 'show'}
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
      </div>
    </main>
  )
}
