import { useState } from 'react'
import './src/App.css'

// Данные
import { EXERCISES, TRAINING_DAYS, EX_COUNT, TYPE_LABELS } from './src/data/exercises'

// Утилиты
import { calcWorkingWeight } from './src/utils/calc'

// Компоненты
import TheoryTab from './src/components/TheoryTab'
import VolumeDonut from './src/components/VolumeDonut'
import ProgressionBlock from './src/components/ProgressionBlock'
import TrainingDayCard from './src/components/TrainingDayCard'
import ExerciseWheel from './src/components/ExerciseWheel'
import { useAuthSession } from './src/hooks/useAuthSession'
import { useCalculatorState } from './src/hooks/useCalculatorState'
import { useTrainingProgram } from './src/hooks/useTrainingProgram'

// ============================================================
// APP — главный компонент, управляет всем состоянием приложения
// Поток данных: Auth → loadUser → [Calculator tab / Training tab]
//   → handleCalculate / handleComplete → saveUser
// ============================================================
function App() {
  const {
    token,
    userName,
    userData,
    setUserData,
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
    handleLogout: logout,
  } = useAuthSession()

  const [activeTab, setActiveTab] = useState<'calculator' | 'training' | 'theory'>('calculator')

  const {
    selectedExercise,
    selectExercise,
    testWeight,
    setTestWeight,
    testBodyWeight,
    setTestBodyWeight,
    testExtraWeight,
    setTestExtraWeight,
    testReps,
    setTestReps,
    activeResult,
    handleCalculate,
    handleDelete,
    handleSelectSaved,
    resetCalculatorState,
  } = useCalculatorState({ token, userName, userData, setUserData })

  const {
    allSaved,
    missingExercises,
    completedSessions,
    currentDayIdx,
    currentWeekIdx,
    programDone,
    nextSessions,
    nextDayIdx,
    nextWeekIdx,
    isMicrocycleBreak,
    completedMicrocycle,
    currentTrainingExercises,
    nextTrainingExercises,
    handleComplete,
    handleReset,
    setRestDismissed,
    resetTrainingState,
  } = useTrainingProgram({ token, userData, setUserData })

  function handleLogout() {
    logout()
    resetCalculatorState()
    resetTrainingState()
    setActiveTab('calculator')
  }

  // --- Auth screen ---
  if (!userName || !token) return (
    <>
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ</h1>
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

  // Loading
  if (!userData) return (
    <>
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ</h1>
      </div>
      <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '48px 0' }}>Загрузка данных...</div>
    </>
  )

  const config = EXERCISES[activeResult?.exerciseKey || selectedExercise]

  // Insight data
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
        <h1>ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ</h1>
        <p>Введи тестовый вес и повторения — получи расклад рабочих весов с реальными схемами на 8 недель</p>
      </div>

      {/* User bar */}
      <div className="user-bar">
        <span className="user-bar-label">Атлет</span>
        <span className="user-bar-name">{userName}</span>
        <div style={{ flex: 1 }} />
        <button className="btn-sm btn-ghost" onClick={handleLogout}>Выйти</button>
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        <button className={`tab-btn${activeTab === 'calculator' ? ' tab-active' : ''}`}
          onClick={() => setActiveTab('calculator')}>
          Калькулятор
        </button>
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
        <button className={`tab-btn${activeTab === 'theory' ? ' tab-active' : ''}`}
          onClick={() => setActiveTab('theory')}>
          Теория
        </button>
      </div>

      {/* ====== CALCULATOR TAB ====== */}
      {activeTab === 'calculator' && (
        <>
          <div className="section">
            <div className="section-header">
              <span className="section-num">01</span>
              <span className="section-title">Тестовый подход</span>
            </div>
            <div className="input-grid">
              <div className="input-group">
                <label className="input-label">Упражнение</label>
                <ExerciseWheel value={selectedExercise} onChange={selectExercise} savedExercises={userData.exercises} />
              </div>

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
                <span style={{ color: '#ffb347', fontWeight: 600 }}>оранжевый ≥28</span>&nbsp;·&nbsp;
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
      {activeTab === 'theory' && <TheoryTab />}

      {/* ====== FILES TAB ====== */}

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

              {/* После завершения микроцикла (3 дня) — карточка отдыха вместо тренировки */}
              {isMicrocycleBreak ? (
                <div className="section">
                  <div className="section-header">
                    <span className="section-num">01</span>
                    <span className="section-title">Завершён {completedMicrocycle}-й микроцикл</span>
                  </div>
                  <div className="rest-card">
                    <div className="rest-card-icon">&#127881;</div>
                    <div className="rest-card-title">Праздник! Время отдохнуть</div>
                    <div className="rest-card-subtitle">
                      {completedMicrocycle}-й микроцикл из 8 пройден — {completedSessions} тренировок позади
                    </div>
                    <div className="rest-card-body">
                      <div className="rest-card-rec">
                        <div className="rest-card-rec-title">Рекомендации на 4–8 дней</div>
                        <ul className="rest-card-list">
                          <li>Полный отдых от силовых тренировок — дай ЦНС восстановиться</li>
                          <li>Поддерживай аэробные нагрузки: бег, плавание, велосипед, ходьба</li>
                          <li>Следи за сном (7–9 часов) и питанием (достаточно белка)</li>
                          <li>Растяжка и мобильность — без фанатизма, лёгко</li>
                        </ul>
                      </div>
                      <div className="rest-card-question">
                        <div className="rest-card-q-title">Как ты себя чувствуешь?</div>
                        <div className="rest-card-q-options">
                          <span className="rest-card-q-opt rest-card-q-green">Отлично, готов продолжать</span>
                          <span className="rest-card-q-opt rest-card-q-yellow">Нормально, но устал</span>
                          <span className="rest-card-q-opt rest-card-q-red">Нужно ещё отдохнуть</span>
                        </div>
                        <div className="rest-card-q-hint">
                          Если чувствуешь усталость или боль в суставах — отдохни полные 8 дней.
                          Если всё хорошо — 4 дня достаточно. Пауза сейчас = прогресс потом.
                        </div>
                      </div>
                    </div>
                    <div className="rest-card-next">
                      Следующий микроцикл: <strong>{completedMicrocycle + 1}-й</strong> · День 1 · {TRAINING_DAYS[0].name}
                    </div>
                  </div>
                  <button className="btn-complete" onClick={() => setRestDismissed(true)}>Начать следующий микроцикл</button>
                </div>
              ) : (
                <>
                  <div className="section">
                    <div className="section-header">
                      <span className="section-num">01</span>
                      <span className="section-title">Текущая тренировка</span>
                    </div>
                    <TrainingDayCard
                      dayDef={TRAINING_DAYS[currentDayIdx]}
                      weekIndex={currentWeekIdx}
                      exercises={currentTrainingExercises}
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
                        exercises={nextTrainingExercises}
                        isPreview
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default App
