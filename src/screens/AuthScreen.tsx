import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

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
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ</h1>
        <p>Рассчитай рабочие веса на 8 недель по своему 1ПМ. Реальные схемы с волновой периодизацией.</p>
      </div>

      <div className="auth-card">
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
          <div className="input-group">
            <label className="input-label">Имя пользователя</label>
            <Input
              placeholder="Стив"
              autoComplete="username"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Пароль</label>
            <Input
              type="password"
              placeholder="••••••"
              autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            />
          </div>

          {authMode === 'register' && (
            <div className="input-group">
              <label className="input-label">Повторить пароль</label>
              <Input
                type="password"
                placeholder="••••••"
                autoComplete="new-password"
                value={pass2Input}
                onChange={(e) => setPass2Input(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>
          )}

          {authError && <div className="auth-error">{authError}</div>}

          <Button
            style={{ width: '100%', marginTop: 8 }}
            onClick={handleAuth}
            disabled={authLoading}
          >
            {authLoading ? '...' : authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </Button>
        </div>
      </div>
    </>
  )
}

