import { useState } from 'react'

// Данные
import { EX_COUNT } from './src/data/exercises'

// Компоненты
import TheoryTab from './src/components/TheoryTab'
import { useAuthSession } from './src/hooks/useAuthSession'
import { useCalculatorState } from './src/hooks/useCalculatorState'
import { useTrainingProgram } from './src/hooks/useTrainingProgram'
import AuthScreen from './src/screens/AuthScreen'
import CalculatorTab from './src/screens/CalculatorTab'
import TrainingTab from './src/screens/TrainingTab'
import { Button } from './src/components/ui/Button'
import { HeroSection } from './src/components/ui/HeroSection'

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

  if (sessionLoading) return (
    <>
      <HeroSection
        label="Тренировочный калькулятор"
        title="ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ"
        subtitle=""
      />
      <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '48px 0' }}>Восстанавливаем сессию...</div>
    </>
  )

  // --- Auth screen ---
  if (!userName || !token) return (
    <AuthScreen
      authMode={authMode}
      setAuthMode={setAuthMode}
      nameInput={nameInput}
      setNameInput={setNameInput}
      passInput={passInput}
      setPassInput={setPassInput}
      pass2Input={pass2Input}
      setPass2Input={setPass2Input}
      authError={authError}
      setAuthError={setAuthError}
      authLoading={authLoading}
      handleAuth={handleAuth}
    />
  )

  // Loading
  if (!userData) return (
    <>
      <HeroSection
        label="Тренировочный калькулятор"
        title="ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ"
        subtitle=""
      />
      <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '48px 0' }}>Загрузка данных...</div>
    </>
  )

  return (
    <>
      <HeroSection
        label="Тренировочный калькулятор"
        title="ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ"
        subtitle="Введи тестовый вес и повторения — получи расклад рабочих весов с реальными схемами на 8 недель"
      />

      {/* User bar */}
      <div className="user-bar">
        <span className="user-bar-label">Атлет</span>
        <span className="user-bar-name">{userName}</span>
        <div style={{ flex: 1 }} />
        <Button size="sm" variant="ghost" onClick={handleLogout}>Выйти</Button>
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
        <CalculatorTab
          userData={userData}
          selectedExercise={selectedExercise}
          selectExercise={selectExercise}
          testWeight={testWeight}
          setTestWeight={setTestWeight}
          testBodyWeight={testBodyWeight}
          setTestBodyWeight={setTestBodyWeight}
          testExtraWeight={testExtraWeight}
          setTestExtraWeight={setTestExtraWeight}
          testReps={testReps}
          setTestReps={setTestReps}
          activeResult={activeResult}
          handleCalculate={handleCalculate}
          handleDelete={handleDelete}
          handleSelectSaved={handleSelectSaved}
        />
      )}

      {/* ====== THEORY TAB ====== */}
      {activeTab === 'theory' && <TheoryTab />}

      {/* ====== FILES TAB ====== */}

      {/* ====== TRAINING TAB ====== */}
      {activeTab === 'training' && (
        <TrainingTab
          userData={userData}
          allSaved={allSaved}
          missingExercises={missingExercises}
          completedSessions={completedSessions}
          currentDayIdx={currentDayIdx}
          currentWeekIdx={currentWeekIdx}
          programDone={programDone}
          nextSessions={nextSessions}
          nextDayIdx={nextDayIdx}
          nextWeekIdx={nextWeekIdx}
          isMicrocycleBreak={isMicrocycleBreak}
          completedMicrocycle={completedMicrocycle}
          currentTrainingExercises={currentTrainingExercises}
          nextTrainingExercises={nextTrainingExercises}
          handleComplete={handleComplete}
          handleReset={handleReset}
          setRestDismissed={setRestDismissed}
          onGoCalculator={() => setActiveTab('calculator')}
        />
      )}
    </>
  )
}

export default App
