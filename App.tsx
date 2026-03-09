import { useState, useEffect } from 'react'
import './src/App.css'

// --- Types ---
interface WeekScheme {
  sets: number
  reps: number
}

interface ExerciseConfig {
  name: string
  type: 'A' | 'B' | 'C' | 'D'
  step: number
  warmupStep: number
  percentages: number[]      // 8 weeks
  weekSchemes: WeekScheme[]   // 8 weeks: real sets×reps
}

interface SavedExercise {
  exerciseKey: string
  testWeight: number
  testReps: number
  oneRM: number
  date: string
}

interface UserData {
  name: string
  exercises: SavedExercise[]
}

// --- Real week schemes from program data ---
// Week 5 = deload (index 4)
const EXERCISES: Record<string, ExerciseConfig> = {
  bench: {
    name: 'Жим штанги лёжа',
    type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      { sets: 4, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 }, { sets: 4, reps: 3 },
    ],
  },
  squat: {
    name: 'Приседания со штангой',
    type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      { sets: 4, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 }, { sets: 4, reps: 3 },
    ],
  },
  deadlift: {
    name: 'Становая тяга',
    type: 'A', step: 2.5, warmupStep: 5,
    percentages: [70, 75, 80, 84, 78, 80, 85, 90],
    weekSchemes: [
      { sets: 4, reps: 6 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 3, reps: 5 },
      { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 }, { sets: 4, reps: 3 },
    ],
  },
  row: {
    name: 'Тяга штанги к поясу',
    type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      { sets: 4, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 }, { sets: 4, reps: 3 },
    ],
  },
  latPull: {
    name: 'Тяга вертикального блока',
    type: 'D', step: 3, warmupStep: 3,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 3, reps: 7 }, { sets: 4, reps: 6 }, { sets: 3, reps: 5 }, { sets: 4, reps: 4 },
    ],
  },
  legPress: {
    name: 'Жим ногами',
    type: 'A', step: 2.5, warmupStep: 5,
    percentages: [72, 74, 81, 83, 74, 79, 82, 84],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 3, reps: 8 }, { sets: 4, reps: 6 }, { sets: 3, reps: 6 },
      { sets: 3, reps: 9 }, { sets: 3, reps: 7 }, { sets: 3, reps: 6 }, { sets: 3, reps: 5 },
    ],
  },
  ohp: {
    name: 'Жим штанги стоя',
    type: 'B', step: 2.5, warmupStep: 2.5,
    percentages: [68, 75, 79, 85, 71, 77, 83, 88],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 },
      { sets: 3, reps: 8 }, { sets: 4, reps: 6 }, { sets: 3, reps: 5 }, { sets: 3, reps: 4 },
    ],
  },
  curl: {
    name: 'Подъём штанги на бицепс',
    type: 'B', step: 2.5, warmupStep: 2.5,
    percentages: [68, 75, 79, 85, 71, 77, 83, 88],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 },
      { sets: 3, reps: 8 }, { sets: 4, reps: 6 }, { sets: 3, reps: 5 }, { sets: 3, reps: 4 },
    ],
  },
  dbPress: {
    name: 'Жим гантелей лёжа',
    type: 'C', step: 2, warmupStep: 2,
    percentages: [65, 68, 72, 75, 69, 73, 77, 80],
    weekSchemes: [
      { sets: 3, reps: 10 }, { sets: 3, reps: 10 }, { sets: 3, reps: 8 }, { sets: 3, reps: 8 },
      { sets: 4, reps: 8 },  { sets: 3, reps: 8 },  { sets: 3, reps: 8 }, { sets: 4, reps: 6 },
    ],
  },
  frenchPress: {
    name: 'Французский жим с гантелями',
    type: 'C', step: 2, warmupStep: 2,
    percentages: [65, 68, 72, 75, 69, 73, 77, 80],
    weekSchemes: [
      { sets: 3, reps: 10 }, { sets: 3, reps: 10 }, { sets: 3, reps: 8 }, { sets: 3, reps: 8 },
      { sets: 4, reps: 8 },  { sets: 3, reps: 8 },  { sets: 3, reps: 8 }, { sets: 4, reps: 6 },
    ],
  },
  lateralRaise: {
    name: 'Махи с гантелями в стороны',
    type: 'C', step: 1, warmupStep: 1,
    percentages: [65, 68, 72, 75, 69, 73, 77, 80],
    weekSchemes: [
      { sets: 3, reps: 10 }, { sets: 3, reps: 10 }, { sets: 3, reps: 8 }, { sets: 3, reps: 8 },
      { sets: 4, reps: 8 },  { sets: 3, reps: 8 },  { sets: 3, reps: 8 }, { sets: 4, reps: 6 },
    ],
  },
  legExt: {
    name: 'Разгибания ног',
    type: 'D', step: 3, warmupStep: 3,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 3, reps: 7 }, { sets: 4, reps: 6 }, { sets: 3, reps: 5 }, { sets: 4, reps: 4 },
    ],
  },
}

const TYPE_LABELS: Record<string, string> = {
  A: 'Тип А — Штанга крупная',
  B: 'Тип Б — Штанга малая',
  C: 'Тип В — Гантели',
  D: 'Тип Г — Тренажёр',
}

const DELOAD_WEEK = 4 // index (week 5)

// --- Calculation ---
function calc1RM(weight: number, reps: number): number {
  if (reps < 5) return weight / (1.0278 - 0.0278 * reps * 1.3)
  if (reps <= 8) return weight / (1.0278 - 0.0278 * reps * 1.2)
  return weight * (1 + 0.0333 * reps * 1.1)
}

function roundWeight(value: number, step: number, type: 'A' | 'B' | 'C' | 'D'): number {
  if (type === 'C') return Math.floor(value / step) * step
  return Math.ceil(value / step) * step
}

function calcWorkingWeight(oneRM: number, pct: number, config: ExerciseConfig): number {
  return roundWeight(oneRM * (pct / 100), config.step, config.type)
}

function volumeClass(total: number): string {
  if (total >= 28) return 'v-hi'
  if (total <= 16) return 'v-lo'
  return 'v-md'
}

function barColor(total: number, isDeload: boolean): string {
  if (isDeload) return 'var(--green, #3affb8)'
  if (total >= 28) return 'var(--accent, #e8ff3a)'
  if (total <= 16) return '#ff4d4d'
  return '#ff9f40'
}

// --- LocalStorage ---
function loadUsers(): Record<string, UserData> {
  try { return JSON.parse(localStorage.getItem('gym_users') || '{}') } catch { return {} }
}
function saveUsers(users: Record<string, UserData>) {
  localStorage.setItem('gym_users', JSON.stringify(users))
}
function loadUser(name: string): UserData {
  const users = loadUsers()
  return users[name] || { name, exercises: [] }
}
function saveUser(data: UserData) {
  const users = loadUsers()
  users[data.name] = data
  saveUsers(users)
}

// --- Wave Chart component ---
function WaveChart({ schemes }: { schemes: WeekScheme[] }) {
  const totals = schemes.map(s => s.sets * s.reps)
  const max = Math.max(...totals)

  return (
    <div style={{ padding: '10px 12px' }}>
      <div className="wave-wrap">
        {totals.map((t, i) => {
          const pct = max > 0 ? (t / max) * 100 : 0
          const isDeload = i === DELOAD_WEEK
          return (
            <div
              key={i}
              className={`wave-bar${isDeload ? ' reload' : ''}`}
              style={{ height: `${pct}%`, background: barColor(t, isDeload) }}
            />
          )
        })}
      </div>
      <div className="wave-labs">
        {schemes.map((_, i) => (
          <div
            key={i}
            className="wave-lab"
            style={i === DELOAD_WEEK ? { color: '#3affb8' } : undefined}
          >
            {i + 1}{i === DELOAD_WEEK ? '↺' : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

// --- App ---
function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('gym_current_user') || '')
  const [nameInput, setNameInput] = useState('')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedExercise, setSelectedExercise] = useState('bench')
  const [testWeight, setTestWeight] = useState('')
  const [testReps, setTestReps] = useState('')
  const [activeResult, setActiveResult] = useState<SavedExercise | null>(null)

  useEffect(() => {
    if (userName) {
      const data = loadUser(userName)
      setUserData(data)
      localStorage.setItem('gym_current_user', userName)
    }
  }, [userName])

  function handleLogin() {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    setUserName(trimmed)
    setNameInput('')
  }

  function handleLogout() {
    setUserName('')
    setUserData(null)
    setActiveResult(null)
    localStorage.removeItem('gym_current_user')
  }

  function handleCalculate() {
    const w = parseFloat(testWeight)
    const r = parseInt(testReps)
    if (!w || !r || r < 1) return

    const oneRM = Math.round(calc1RM(w, r) * 10) / 10
    const saved: SavedExercise = {
      exerciseKey: selectedExercise,
      testWeight: w, testReps: r, oneRM,
      date: new Date().toLocaleDateString('ru-RU'),
    }

    const updated: UserData = {
      name: userName,
      exercises: [
        ...(userData?.exercises.filter(e => e.exerciseKey !== selectedExercise) || []),
        saved,
      ],
    }
    saveUser(updated)
    setUserData(updated)
    setActiveResult(saved)
    setTestWeight('')
    setTestReps('')
  }

  function handleDeleteExercise(key: string) {
    if (!userData) return
    const updated: UserData = {
      ...userData,
      exercises: userData.exercises.filter(e => e.exerciseKey !== key),
    }
    saveUser(updated)
    setUserData(updated)
    if (activeResult?.exerciseKey === key) setActiveResult(null)
  }

  function handleSelectSaved(saved: SavedExercise) {
    setActiveResult(saved)
    setSelectedExercise(saved.exerciseKey)
  }

  // --- Login screen ---
  if (!userName) {
    return (
      <>
        <div className="hero">
          <div className="hero-label">Тренировочный калькулятор</div>
          <h1>УМНАЯ ПРОГА 1.1</h1>
          <p>Рассчитай рабочие веса на 8 недель по своему 1ПМ. Реальные схемы подходов с волновой периодизацией.</p>
        </div>
        <div className="section">
          <div className="section-header">
            <span className="section-num">01</span>
            <span className="section-title">Вход</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'end' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Имя</label>
              <input
                className="input-field"
                placeholder="Введи своё имя"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button className="btn" onClick={handleLogin}>Войти</button>
          </div>
        </div>
      </>
    )
  }

  const config = EXERCISES[activeResult?.exerciseKey || selectedExercise]

  // Build weekly rows for current result
  const weekRows = activeResult ? config.percentages.map((pct, i) => {
    const weight = calcWorkingWeight(activeResult.oneRM, pct, config)
    const scheme = config.weekSchemes[i]
    const totalReps = scheme.sets * scheme.reps
    const isDeload = i === DELOAD_WEEK
    return { week: i + 1, pct, weight, scheme, totalReps, isDeload }
  }) : []

  // Volume stats
  const week1Vol = weekRows.length > 0 ? weekRows[0].totalReps : 0
  const week8Vol = weekRows.length > 0 ? weekRows[weekRows.length - 1].totalReps : 0
  const week1Weight = weekRows.length > 0 ? weekRows[0].weight : 0
  const week8Weight = weekRows.length > 0 ? weekRows[weekRows.length - 1].weight : 0

  return (
    <>
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>УМНАЯ ПРОГА 1.1</h1>
        <p>Введи тестовый вес и повторения — получи расклад рабочих весов с реальными схемами подходов на 8 недель</p>
      </div>

      {/* User Bar */}
      <div className="user-bar">
        <span className="user-bar-label">Атлет</span>
        <span className="user-bar-name">{userName}</span>
        <div style={{ flex: 1 }} />
        <button className="btn-sm btn-ghost" onClick={handleLogout}>Выйти</button>
      </div>

      {/* Input Section */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">01</span>
          <span className="section-title">Тестовый подход</span>
        </div>

        <div className="input-grid">
          <div className="input-group">
            <label className="input-label">Упражнение</label>
            <select
              className="input-field"
              value={selectedExercise}
              onChange={e => setSelectedExercise(e.target.value)}
            >
              {Object.entries(EXERCISES).map(([key, ex]) => (
                <option key={key} value={key}>{ex.name}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Вес (кг)</label>
            <input
              className="input-field"
              type="number"
              placeholder="80"
              value={testWeight}
              onChange={e => setTestWeight(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCalculate()}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Повторений</label>
            <input
              className="input-field"
              type="number"
              placeholder="6"
              min="1"
              max="20"
              value={testReps}
              onChange={e => setTestReps(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCalculate()}
            />
          </div>
          <button className="btn" onClick={handleCalculate}>Рассчитать</button>
        </div>

        <div className="note-box" style={{ marginTop: 16 }}>
          <strong>Инструкция:</strong> Выполни отказной подход с весом в диапазоне 4–8 повторений.
          Введи вес и количество повторений — калькулятор пересчитает твой 1ПМ и покажет рабочие веса на каждую неделю
          с реальными схемами подходов × повторений.
        </div>
      </div>

      {/* Result Section */}
      {activeResult && (
        <div className="section">
          <div className="section-header">
            <span className="section-num">02</span>
            <span className="section-title">Прогрессия — {config.name}</span>
          </div>

          {/* Insight */}
          <div className="insight">
            <strong>Объём ≠ постоянная величина.</strong> Повторения и подходы снижаются по мере роста весов — это линейная волна с разгрузочным откатом на неделе 5.
            {week1Vol > 0 && week8Vol > 0 && (
              <>
                <br /><br />
                Нед. 1: <code>{week1Weight} кг × {weekRows[0].scheme.sets} × {weekRows[0].scheme.reps} = {week1Vol} повт</code> →
                Нед. 8: <code>{week8Weight} кг × {weekRows[weekRows.length - 1].scheme.sets} × {weekRows[weekRows.length - 1].scheme.reps} = {week8Vol} повт</code>.
                {' '}Вес вырос на <strong>+{Math.round((week8Weight / week1Weight - 1) * 100)}%</strong>, объём
                {week1Vol > week8Vol
                  ? <> упал в <strong>{(week1Vol / week8Vol).toFixed(1)}×</strong></>
                  : <> стабилен</>
                }.
              </>
            )}
          </div>

          {/* Result card + table in a progression block */}
          <div className="pb">
            <div className="pb-head">
              <span className="pb-head-name">{config.name}</span>
              <span className="pb-head-1rm">1ПМ = {activeResult.oneRM} кг</span>
            </div>

            <table className="pt">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Нед</th>
                  <th>Вес, кг</th>
                  <th>Схема</th>
                  <th>Повт итого</th>
                </tr>
              </thead>
              <tbody>
                {weekRows.map(row => (
                  <tr key={row.week} className={row.isDeload ? 'rr' : ''}>
                    <td className="w-label" style={{ textAlign: 'left' }}>
                      {row.week}{row.isDeload ? ' ↺' : ''}
                    </td>
                    <td className="w-kg">{row.weight.toFixed(1)}</td>
                    <td className="w-sr">
                      {row.scheme.sets !== 4
                        ? <><b>{row.scheme.sets}</b> × {row.scheme.reps}</>
                        : <>{row.scheme.sets} × {row.scheme.reps}</>
                      }
                    </td>
                    <td className={volumeClass(row.totalReps)}>{row.totalReps}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Wave chart */}
            <WaveChart schemes={config.weekSchemes} />
          </div>

          <div className="result-card" style={{ marginTop: 16 }}>
            <div className="result-label">Расчётный 1ПМ</div>
            <div className="result-value">
              {activeResult.oneRM}<span>кг</span>
            </div>
            <div className="result-meta">
              Тест: {activeResult.testWeight} кг × {activeResult.testReps} повт. &nbsp;|&nbsp;
              {TYPE_LABELS[config.type]} &nbsp;|&nbsp;
              Шаг: {config.step} кг &nbsp;|&nbsp;
              {activeResult.date}
            </div>
          </div>

          <div className="note-box">
            <strong>↺ Неделя 5 — волновой откат:</strong> Вес снижается до уровня нед. 1–2, объём возвращается
            или даже превышает начальный. Это создаёт суперкомпенсацию перед финальным накопительным блоком нед. 5–8.
            &nbsp;·&nbsp; <strong>Жирный шрифт</strong> в колонке «Схема» означает отклонение от стандартных 4 подходов.
            <br /><br />
            <strong>Цветовая кодировка объёма:</strong>{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>жёлтый ≥28 повт</span> &nbsp;·&nbsp;
            <span style={{ color: '#aaa' }}>серый 17–27</span> &nbsp;·&nbsp;
            <span style={{ color: '#ff4d4d', fontWeight: 600 }}>красный ≤16</span> — тяжёлая зона.
          </div>
        </div>
      )}

      {/* Saved Exercises */}
      {userData && userData.exercises.length > 0 && (
        <div className="section">
          <div className="section-header">
            <span className="section-num">03</span>
            <span className="section-title">Сохранённые упражнения</span>
          </div>

          <div className="saved-list">
            {userData.exercises.map(saved => {
              const ex = EXERCISES[saved.exerciseKey]
              if (!ex) return null
              return (
                <div
                  key={saved.exerciseKey}
                  className="saved-item"
                  onClick={() => handleSelectSaved(saved)}
                >
                  <div>
                    <div className="saved-item-name">{ex.name}</div>
                    <div className="saved-item-info">
                      {saved.testWeight}кг × {saved.testReps} повт. &nbsp;|&nbsp; {saved.date}
                    </div>
                  </div>
                  <div className="saved-item-actions">
                    <span className="saved-item-1rm">{saved.oneRM} кг</span>
                    <button
                      className="btn-sm btn-danger"
                      onClick={e => { e.stopPropagation(); handleDeleteExercise(saved.exerciseKey) }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default App
