import { useState, useEffect } from 'react'
import './App.css'
import type { UserData, SavedExercise } from './types'
import { EXERCISES, TRAINING_DAYS, EX_COUNT, TYPE_LABELS } from './constants'
import { jwtName, calc1RM, calcWorkingWeight } from './utils'
import { loadUser, saveUser, apiAuth } from './api'
import { TheoryTab } from './components/TheoryTab'
import { VolumeDonut } from './components/VolumeDonut'
import { ProgressionBlock } from './components/ProgressionBlock'
import { TrainingDayCard } from './components/TrainingDayCard'
import { ExerciseWheel } from './components/ExerciseWheel'

// ============================================================
// APP — главный компонент, управляет всем состоянием приложения
// Поток данных: Auth → loadUser → [Calculator tab / Training tab]
//   → handleCalculate / handleComplete → saveUser
// ============================================================
function App() {
  // --- Аутентификация ---
  // token хранится в localStorage, при перезагрузке восстанавливается
  const [token, setToken]       = useState(() => localStorage.getItem('gym_token') || '')
  const [userName, setUserName] = useState(() => {
    const t = localStorage.getItem('gym_token') || ''
    return t ? (jwtName(t) || '') : ''
  })

  // --- Данные пользователя (загружаются с сервера после входа) ---
  const [userData, setUserData]         = useState<UserData | null>(null)

  // --- Форма калькулятора ---
  const [selectedExercise, setSelectedExercise] = useState('bench')
  const [testWeight, setTestWeight]     = useState('')    // для обычных упражнений
  const [testBodyWeight, setTestBodyWeight] = useState('') // вес тела (только для подтягиваний)
  const [testExtraWeight, setTestExtraWeight] = useState('') // доп. вес (только для подтягиваний)
  const [testReps, setTestReps]         = useState('')
  const [activeResult, setActiveResult] = useState<SavedExercise | null>(null)

  // --- Навигация по вкладкам ---
  // 'calculator' — форма ввода + прогрессия
  // 'training'   — текущая тренировка по плану
  // 'theory'     — справочник: понятия + tier-лист добавок
  const [activeTab, setActiveTab]       = useState<'calculator' | 'training' | 'theory'>('calculator')

  // --- Форма авторизации ---
  const [authMode, setAuthMode]     = useState<'login' | 'register'>('login')
  const [nameInput, setNameInput]   = useState('')
  const [passInput, setPassInput]   = useState('')
  const [pass2Input, setPass2Input] = useState('')
  const [authError, setAuthError]   = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Загружаем данные пользователя после входа (или при восстановлении сессии из токена)
  useEffect(() => {
    if (userName && token) {
      loadUser(userName, token).then(d => {
        if (d) setUserData(d)
        else { setToken(''); setUserName(''); localStorage.removeItem('gym_token') }
      })
    }
  }, [userName, token])

  // allSaved=true когда для всех 11 упражнений введён 1ПМ → разблокирует вкладку "Тренировка"
  const allSaved = userData
    ? Object.keys(EXERCISES).every(k => userData.exercises.some(e => e.exerciseKey === k))
    : false

  // Прогресс 8-недельного цикла (24 тренировки = 8 недель × 3 дня)
  const completedSessions = userData?.trainingProgress?.completedSessions ?? 0
  const currentDayIdx  = completedSessions % 3                // текущий день: 0,1,2
  const currentWeekIdx = Math.floor(completedSessions / 3)    // текущая неделя: 0–7
  const programDone    = completedSessions >= 24              // цикл завершён
  const nextSessions   = completedSessions + 1
  const nextDayIdx     = nextSessions % 3
  const nextWeekIdx    = Math.floor(nextSessions / 3)

  // Возвращает упражнения с весами для конкретного дня и недели
  // Для pullUp добавляет поля isPullup и extraWeight для отображения прибавки
  function getTrainingExercises(dayIdx: number, weekIdx: number) {
    return TRAINING_DAYS[dayIdx].exerciseKeys.map(key => {
      const cfg = EXERCISES[key]
      const saved = userData?.exercises.find(e => e.exerciseKey === key)
      if (!saved) return null
      const totalWeight = calcWorkingWeight(saved.oneRM, cfg.percentages[weekIdx], cfg)
      const scheme = cfg.weekSchemes[weekIdx]
      const isPullup = !!cfg.isPullup
      const extraWeight = isPullup && saved.bodyWeight != null
        ? totalWeight - saved.bodyWeight
        : undefined
      return { key, name: cfg.name, weight: totalWeight, scheme, totalReps: scheme.sets * scheme.reps, isPullup, extraWeight }
    }).filter((x): x is NonNullable<typeof x> => x !== null)
  }

  // Список упражнений без сохранённого 1ПМ — показывается в "заблокированном" виде вкладки тренировки
  const missingExercises = Object.entries(EXERCISES)
    .filter(([k]) => !userData?.exercises.some(e => e.exerciseKey === k))
    .map(([, ex]) => ex.name)

  // --- Вход / регистрация ---
  // Получает JWT-токен от сервера, сохраняет в localStorage
  async function handleAuth() {
    const name = nameInput.trim()
    const pass = passInput
    if (!name || !pass) { setAuthError('Заполни все поля'); return }
    if (authMode === 'register' && pass !== pass2Input) { setAuthError('Пароли не совпадают'); return }
    setAuthLoading(true); setAuthError('')
    const res = await apiAuth(authMode === 'login' ? 'login' : 'register', { name, password: pass })
    setAuthLoading(false)
    if (res.error) { setAuthError(res.error); return }
    const tok = res.token!
    localStorage.setItem('gym_token', tok)
    setToken(tok); setUserName(res.name!)
    setNameInput(''); setPassInput(''); setPass2Input('')
  }

  // Очищает токен и возвращает на экран входа
  function handleLogout() {
    localStorage.removeItem('gym_token')
    setToken(''); setUserName(''); setUserData(null)
    setActiveResult(null); setActiveTab('calculator')
  }

  // Главный расчёт: вес × повторения → 1ПМ → сохранение в UserData → на сервер
  // Для pullUp: testWeight = bodyWeight + extraWeight, сохраняется bodyWeight отдельно
  function handleCalculate() {
    const cfg = EXERCISES[selectedExercise]
    let totalWeight: number
    let bodyWeightVal: number | undefined

    if (cfg.isPullup) {
      // Подтягивания: суммируем вес тела + дополнительный вес
      const bw = parseFloat(testBodyWeight)
      const ew = parseFloat(testExtraWeight) || 0
      if (!bw || bw < 1) return
      totalWeight = bw + ew
      bodyWeightVal = bw
    } else {
      // Обычное упражнение: одно поле веса
      totalWeight = parseFloat(testWeight)
      if (!totalWeight || totalWeight < 1) return
    }

    const r = parseInt(testReps)
    if (!r || r < 1) return

    const oneRM = Math.round(calc1RM(totalWeight, r) * 10) / 10
    const saved: SavedExercise = {
      exerciseKey: selectedExercise, testWeight: totalWeight, testReps: r, oneRM,
      date: new Date().toLocaleDateString('ru-RU'),
      bodyWeight: bodyWeightVal, // undefined для обычных упражнений
    }
    const updated: UserData = {
      ...userData!, name: userName,
      exercises: [...(userData?.exercises.filter(e => e.exerciseKey !== selectedExercise) || []), saved],
    }
    setUserData(updated); setActiveResult(saved)
    // Сбрасываем поля ввода после расчёта
    setTestWeight(''); setTestReps(''); setTestBodyWeight(''); setTestExtraWeight('')
    saveUser(updated, token)
  }

  // Удаляет сохранённое упражнение (кнопка × в списке сохранённых)
  function handleDelete(key: string) {
    if (!userData) return
    const updated: UserData = { ...userData, exercises: userData.exercises.filter(e => e.exerciseKey !== key) }
    setUserData(updated)
    if (activeResult?.exerciseKey === key) setActiveResult(null)
    saveUser(updated, token)
  }

  // Выбор упражнения из сохранённых → показывает его прогрессию
  function handleSelectSaved(saved: SavedExercise) {
    setActiveResult(saved); setSelectedExercise(saved.exerciseKey)
  }

  // Завершение тренировки: увеличивает счётчик → следующий день/неделя
  function handleComplete() {
    if (!userData || programDone) return
    const updated: UserData = { ...userData, trainingProgress: { completedSessions: completedSessions + 1 } }
    setUserData(updated); saveUser(updated, token)
  }

  // Сброс программы: возвращает к Дню 1, Неделе 1
  function handleReset() {
    if (!userData) return
    const updated: UserData = { ...userData, trainingProgress: { completedSessions: 0 } }
    setUserData(updated); saveUser(updated, token)
  }

  // --- Auth screen ---
  if (!userName || !token) return (
    <>
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>УМНАЯ ПРОГА 1.1</h1>
        <p>Рассчитай рабочие веса на 8 недель по своему 1ПМ. Реальные схемы с волновой периодизацией.</p>
      </div>
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={`auth-tab${authMode === 'login' ? ' auth-tab-active' : ''}`}
            onClick={() => { setAuthMode('login'); setAuthError('') }}>Войти</button>
          <button className={`auth-tab${authMode === 'register' ? ' auth-tab-active' : ''}`}
            onClick={() => { setAuthMode('register'); setAuthError('') }}>Регистрация</button>
        </div>
        <div className="auth-form">
          <div className="input-group">
            <label className="input-label">Имя пользователя</label>
            <input className="input-field" placeholder="Стив" autoComplete="username"
              value={nameInput} onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAuth()} />
          </div>
          <div className="input-group">
            <label className="input-label">Пароль</label>
            <input className="input-field" type="password" placeholder="••••••" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
              value={passInput} onChange={e => setPassInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAuth()} />
          </div>
          {authMode === 'register' && (
            <div className="input-group">
              <label className="input-label">Повторить пароль</label>
              <input className="input-field" type="password" placeholder="••••••" autoComplete="new-password"
                value={pass2Input} onChange={e => setPass2Input(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAuth()} />
            </div>
          )}
          {authError && <div className="auth-error">{authError}</div>}
          <button className="btn" style={{ width: '100%', marginTop: 8 }}
            onClick={handleAuth} disabled={authLoading}>
            {authLoading ? '...' : authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        </div>
      </div>
    </>
  )

  // Loading state while fetching user data
  if (!userData) return (
    <>
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>УМНАЯ ПРОГА 1.1</h1>
      </div>
      <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '48px 0' }}>Загрузка данных...</div>
    </>
  )

  const config = EXERCISES[activeResult?.exerciseKey || selectedExercise]

  // Insight data for the active result
  const weekRows = activeResult
    ? config.percentages.map((pct, i) => {
        const weight = calcWorkingWeight(activeResult.oneRM, pct, config)
        const scheme = config.weekSchemes[i]
        return { weight, scheme, totalReps: scheme.sets * scheme.reps }
      })
    : []
  const w1 = weekRows[0], w8 = weekRows[weekRows.length - 1]

  return (
    <>
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>УМНАЯ ПРОГА 1.1</h1>
        <p>Введи тестовый вес и повторения — получи расклад рабочих весов с реальными схемами на 8 недель</p>
      </div>

      {/* User bar */}
      <div className="user-bar">
        <span className="user-bar-label">Атлет</span>
        <span className="user-bar-name">{userName}</span>
        <div style={{ flex: 1 }} />
        <button className="btn-sm btn-ghost" onClick={handleLogout}>Выйти</button>
      </div>

      {/* Tab bar — три вкладки: Калькулятор / Тренировка / Теория */}
      <div className="tab-bar">
        {/* Калькулятор: всегда активен */}
        <button className={`tab-btn${activeTab === 'calculator' ? ' tab-active' : ''}`}
          onClick={() => setActiveTab('calculator')}>
          Калькулятор
        </button>
        {/* Тренировка: заблокирована пока не введены все 1ПМ */}
        <button
          className={`tab-btn${activeTab === 'training' ? ' tab-active' : ''}${!allSaved ? ' tab-locked' : ''}`}
          onClick={() => allSaved && setActiveTab('training')}
          title={!allSaved ? `Сохрани 1ПМ для всех ${EX_COUNT} упражнений` : undefined}
        >
          Тренировка {!allSaved && (
            <span style={{ fontSize: 11, marginLeft: 6, opacity: 0.55 }}>
              ({userData?.exercises.length || 0}/{EX_COUNT})
            </span>
          )}
        </button>
        {/* Теория: всегда доступна — справочник и tier-лист добавок */}
        <button className={`tab-btn${activeTab === 'theory' ? ' tab-active' : ''}`}
          onClick={() => setActiveTab('theory')}>
          Теория
        </button>
      </div>

      {/* ====== CALCULATOR TAB ====== */}
      {activeTab === 'calculator' && (
        <>
          {/* Input */}
          <div className="section">
            <div className="section-header">
              <span className="section-num">01</span>
              <span className="section-title">Тестовый подход</span>
            </div>
            <div className="input-grid">
              {/* Колесо упражнений — при выборе pullUp меняется состав полей ввода */}
              <div className="input-group">
                <label className="input-label">Упражнение</label>
                <ExerciseWheel value={selectedExercise} onChange={key => {
                  setSelectedExercise(key)
                  // Сбрасываем поля при смене упражнения
                  setTestWeight(''); setTestBodyWeight(''); setTestExtraWeight(''); setTestReps('')
                }} savedExercises={userData.exercises} />
              </div>

              {/* Поля ввода: для подтягиваний — 2 поля (тело + доп.), для остальных — 1 */}
              {EXERCISES[selectedExercise].isPullup ? (<>
                <div className="input-group">
                  <label className="input-label">Вес тела (кг)</label>
                  <input className="input-field" type="number" placeholder="80"
                    value={testBodyWeight} onChange={e => setTestBodyWeight(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCalculate()} />
                </div>
                <div className="input-group">
                  <label className="input-label">Доп. вес (кг)</label>
                  <input className="input-field" type="number" placeholder="0"
                    value={testExtraWeight} onChange={e => setTestExtraWeight(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCalculate()} />
                </div>
              </>) : (
                <div className="input-group">
                  <label className="input-label">Вес (кг)</label>
                  <input className="input-field" type="number" placeholder="80"
                    value={testWeight} onChange={e => setTestWeight(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCalculate()} />
                </div>
              )}

              <div className="input-group">
                <label className="input-label">Повторений</label>
                <input className="input-field" type="number" placeholder="6" min="1" max="20"
                  value={testReps} onChange={e => setTestReps(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCalculate()} />
              </div>
              <button className="btn" onClick={handleCalculate}>Рассчитать</button>
            </div>

            {/* Инструкция — меняется для подтягиваний */}
            <div className="note-box" style={{ marginTop: 16 }}>
              {EXERCISES[selectedExercise].isPullup ? (<>
                <strong>Подтягивания:</strong> введи вес тела + доп. вес (если есть). Итоговый 1ПМ = тело + доп.
                В прогрессии показана только прибавка к весу тела (+X кг к поясу). Если результат отрицательный — ассистированные подтягивания.
              </>) : (<>
                <strong>Инструкция:</strong> Отказной подход в диапазоне 4–8 повторений → калькулятор пересчитает 1ПМ
                и покажет рабочие веса на 8 недель с реальными схемами. Наведи на строку — бар подсветится.
              </>)}
            </div>
          </div>

          {/* Result */}
          {activeResult && (
            <div className="section">
              <div className="section-header">
                <span className="section-num">02</span>
                <span className="section-title">Прогрессия — {config.name}</span>
              </div>

              <div className="insight">
                <strong>Объём снижается по мере роста весов</strong> — линейная волна с откатом на неделе 5.
                {w1 && w8 && (<>
                  <br /><br />
                  Нед 1: <code>{w1.weight} кг · {w1.scheme.sets}×{w1.scheme.reps} = {w1.totalReps} повт</code>
                  {' → '}
                  Нед 8: <code>{w8.weight} кг · {w8.scheme.sets}×{w8.scheme.reps} = {w8.totalReps} повт</code>
                  {'. Вес +'}
                  <strong>{Math.round((w8.weight / w1.weight - 1) * 100)}%</strong>
                  {', объём '}
                  {w1.totalReps > w8.totalReps
                    ? <>упал в <strong>{(w1.totalReps / w8.totalReps).toFixed(1)}×</strong></>
                    : <>стабилен</>
                  }.
                </>)}
              </div>

              <ProgressionBlock config={config} result={activeResult} />

              <div className="result-card" style={{ marginTop: 16 }}>
                <div className="result-label">Расчётный 1ПМ</div>
                <div className="result-value">{activeResult.oneRM}<span>кг</span></div>
                <div className="result-meta">
                  Тест: {activeResult.testWeight} кг × {activeResult.testReps} повт &nbsp;|&nbsp;
                  {TYPE_LABELS[config.type]} &nbsp;|&nbsp; Шаг: {config.step} кг &nbsp;|&nbsp; {activeResult.date}
                </div>
              </div>

              <div className="note-box">
                <strong>↺ Нед 5 — волновой откат:</strong> вес снижается, объём восстанавливается.
                &nbsp;·&nbsp; <strong>Жирный</strong> в «Схема» = отклонение от 4 подходов.
                <br /><br />
                <strong>Цвет объёма:</strong>{' '}
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>жёлтый ≥28</span>&nbsp;·&nbsp;
                <span style={{ color: '#aaa' }}>серый 17–27</span>&nbsp;·&nbsp;
                <span style={{ color: '#ff4d4d', fontWeight: 600 }}>красный ≤16</span>
              </div>
            </div>
          )}

          {/* Saved exercises */}
          {userData && userData.exercises.length > 0 && (
            <div className="section">
              <div className="section-header">
                <span className="section-num">03</span>
                <span className="section-title">
                  Сохранённые
                  <span style={{ fontFamily: 'Courier New', fontSize: 14, color: 'var(--muted)', marginLeft: 12 }}>
                    {userData.exercises.length}/{EX_COUNT}
                  </span>
                </span>
              </div>
              <div className="saved-list">
                {userData.exercises.map(saved => {
                  const ex = EXERCISES[saved.exerciseKey]; if (!ex) return null
                  const isActive = activeResult?.exerciseKey === saved.exerciseKey
                  return (
                    <div key={saved.exerciseKey}
                      className={`saved-item${isActive ? ' saved-item-active' : ''}`}
                      onClick={() => handleSelectSaved(saved)}
                    >
                      <div>
                        <div className="saved-item-name">{ex.name}</div>
                        <div className="saved-item-info">{saved.testWeight}кг × {saved.testReps} повт &nbsp;|&nbsp; {saved.date}</div>
                      </div>
                      <div className="saved-item-actions">
                        <span className="saved-item-1rm">{saved.oneRM} кг</span>
                        <button className="btn-sm btn-danger"
                          onClick={e => { e.stopPropagation(); handleDelete(saved.exerciseKey) }}>×</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Volume donut */}
          <div className="section">
            <div className="section-header">
              <span className="section-num">04</span>
              <span className="section-title">Распределение объёма</span>
            </div>
            <div className="note-box" style={{ marginBottom: 20 }}>
              Средние рабочие подходы за цикл (3 дня), распределённые по мышечным группам.
              Наведи на сектор чтобы увидеть детали.
            </div>
            <VolumeDonut />
          </div>
        </>
      )}

      {/* ====== THEORY TAB ====== */}
      {/* Рендерим компонент TheoryTab целиком — он содержит все 3 секции */}
      {activeTab === 'theory' && <TheoryTab />}

      {/* ====== TRAINING TAB ====== */}
      {activeTab === 'training' && (
        <>
          {!allSaved ? (
            <div className="locked-view">
              <div className="locked-icon">&#128274;</div>
              <div className="locked-title">Введи 1ПМ для всех упражнений</div>
              <div className="locked-desc">
                Вкладка «Тренировка» станет доступна когда рассчитаны 1ПМ для всех {EX_COUNT} упражнений.
              </div>
              <div className="locked-missing">
                {missingExercises.map(n => <span key={n} className="locked-missing-item">— {n}</span>)}
              </div>
              <button className="btn" style={{ marginTop: 24 }} onClick={() => setActiveTab('calculator')}>
                Перейти в калькулятор
              </button>
            </div>
          ) : programDone ? (
            <div className="section">
              <div className="section-header">
                <span className="section-num">01</span>
                <span className="section-title">Программа завершена</span>
              </div>
              <div className="program-complete">
                <div className="program-complete-icon">&#127942;</div>
                <div className="program-complete-title">8 недель пройдено!</div>
                <div className="program-complete-stat">{completedSessions} тренировок · 8 недель · 3 дня</div>
                <p className="program-complete-desc">
                  Пересчитай 1ПМ по контрольным подходам и начни новый цикл.
                </p>
                <button className="btn" style={{ marginTop: 20 }} onClick={handleReset}>Начать новый цикл</button>
              </div>
            </div>
          ) : (
            <>
              <div className="training-progress">
                <div className="training-progress-label">
                  <span>Прогресс программы</span>
                  <span>{completedSessions} / 24 тренировок</span>
                </div>
                <div className="training-progress-bar">
                  <div className="training-progress-fill" style={{ width: `${(completedSessions / 24) * 100}%` }} />
                </div>
              </div>

              <div className="section">
                <div className="section-header">
                  <span className="section-num">01</span>
                  <span className="section-title">Текущая тренировка</span>
                </div>
                <TrainingDayCard
                  dayDef={TRAINING_DAYS[currentDayIdx]}
                  weekIndex={currentWeekIdx}
                  exercises={getTrainingExercises(currentDayIdx, currentWeekIdx)}
                />
                <button className="btn-complete" onClick={handleComplete}>Завершить тренировку</button>
              </div>

              {nextSessions < 24 && (
                <div className="section">
                  <div className="section-header">
                    <span className="section-num">02</span>
                    <span className="section-title">Следующая тренировка</span>
                  </div>
                  <div className="next-day-label">Предпросмотр</div>
                  <TrainingDayCard
                    dayDef={TRAINING_DAYS[nextDayIdx]}
                    weekIndex={nextWeekIdx}
                    exercises={getTrainingExercises(nextDayIdx, nextWeekIdx)}
                    isPreview
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default App
