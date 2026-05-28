import { useState } from 'react'
import { EXERCISES } from '../data/exercises.ts'
import type { SavedExercise, UserData } from '../types/index.ts'
import { calc1RM } from '../utils/calc.ts'

export interface UseCalculatorStateOptions {
  token: string
  userName: string
  userData: UserData | null
  setUserData: (value: UserData | null) => void
  saveUser: (data: UserData, token: string) => Promise<{ ok: boolean } | void> | void
}

export function useCalculatorState({
  token,
  userName,
  userData,
  setUserData,
  saveUser,
}: UseCalculatorStateOptions) {
  const [selectedExercise, setSelectedExercise] = useState('bench')
  const [testWeight, setTestWeight] = useState('')
  const [testBodyWeight, setTestBodyWeight] = useState('')
  const [testExtraWeight, setTestExtraWeight] = useState('')
  const [testReps, setTestReps] = useState('')
  const [activeResult, setActiveResult] = useState<SavedExercise | null>(null)

  function resetInputs() {
    setTestWeight('')
    setTestReps('')
    setTestBodyWeight('')
    setTestExtraWeight('')
  }

  function resetCalculatorState() {
    setActiveResult(null)
    setSelectedExercise('bench')
    resetInputs()
  }

  function selectExercise(key: string) {
    setSelectedExercise(key)
    resetInputs()
  }

  function handleCalculate() {
    if (!userData) return

    const config = EXERCISES[selectedExercise]
    let totalWeight: number
    let bodyWeightVal: number | undefined

    if (config.isPullup) {
      const bodyWeight = parseFloat(testBodyWeight)
      const extraWeight = parseFloat(testExtraWeight) || 0
      if (!bodyWeight || bodyWeight < 1) return
      totalWeight = bodyWeight + extraWeight
      bodyWeightVal = bodyWeight
    } else {
      totalWeight = parseFloat(testWeight)
      if (!totalWeight || totalWeight < 1) return
    }

    const reps = parseInt(testReps)
    if (!reps || reps < 1) return

    const oneRM = Math.round(calc1RM(totalWeight, reps) * 10) / 10
    const saved: SavedExercise = {
      exerciseKey: selectedExercise,
      testWeight: totalWeight,
      testReps: reps,
      oneRM,
      date: new Date().toLocaleDateString('ru-RU'),
      ...(bodyWeightVal !== undefined ? { bodyWeight: bodyWeightVal } : {}),
    }

    const updated: UserData = {
      ...userData,
      name: userName,
      exercises: [...userData.exercises.filter((exercise) => exercise.exerciseKey !== selectedExercise), saved],
    }

    setUserData(updated)
    setActiveResult(saved)
    resetInputs()
    void saveUser(updated, token)
  }

  function handleDelete(key: string) {
    if (!userData) return

    const updated: UserData = {
      ...userData,
      exercises: userData.exercises.filter((exercise) => exercise.exerciseKey !== key),
    }

    setUserData(updated)
    if (activeResult?.exerciseKey === key) setActiveResult(null)
    void saveUser(updated, token)
  }

  function handleSelectSaved(saved: SavedExercise) {
    setActiveResult(saved)
    setSelectedExercise(saved.exerciseKey)
  }

  return {
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
  }
}
