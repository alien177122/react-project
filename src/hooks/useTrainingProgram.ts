import { useMemo, useState } from 'react'
import { EXERCISES } from '../data/exercises'
import type { UserData } from '../types'
import { saveUser } from '../utils/api'
import { getTrainingExercises } from '../utils/training'

interface UseTrainingProgramOptions {
  token: string
  userData: UserData | null
  setUserData: (value: UserData | null) => void
}

export function useTrainingProgram({ token, userData, setUserData }: UseTrainingProgramOptions) {
  const [restDismissed, setRestDismissed] = useState(false)

  const savedExerciseKeys = useMemo(
    () => new Set(userData?.exercises.map(exercise => exercise.exerciseKey) ?? []),
    [userData?.exercises],
  )

  const allSaved = userData
    ? Object.keys(EXERCISES).every(key => savedExerciseKeys.has(key))
    : false

  const completedSessions = userData?.trainingProgress?.completedSessions ?? 0
  const currentDayIdx = completedSessions % 3
  const currentWeekIdx = Math.floor(completedSessions / 3)
  const programDone = completedSessions >= 24
  const nextSessions = completedSessions + 1
  const nextDayIdx = nextSessions % 3
  const nextWeekIdx = Math.floor(nextSessions / 3)

  const isMicrocycleBreak = completedSessions > 0
    && completedSessions % 3 === 0
    && !programDone
    && !restDismissed
  const completedMicrocycle = Math.ceil(completedSessions / 3)

  const missingExercises = useMemo(
    () => Object.entries(EXERCISES)
      .filter(([key]) => !savedExerciseKeys.has(key))
      .map(([, exercise]) => exercise.name),
    [savedExerciseKeys],
  )

  const currentTrainingExercises = useMemo(
    () => getTrainingExercises(currentDayIdx, currentWeekIdx, userData?.exercises ?? []),
    [currentDayIdx, currentWeekIdx, userData?.exercises],
  )

  const nextTrainingExercises = useMemo(
    () => getTrainingExercises(nextDayIdx, nextWeekIdx, userData?.exercises ?? []),
    [nextDayIdx, nextWeekIdx, userData?.exercises],
  )

  function updateTrainingProgress(completed: number) {
    if (!userData) return
    const updated: UserData = {
      ...userData,
      trainingProgress: { completedSessions: completed },
    }
    setUserData(updated)
    void saveUser(updated, token)
  }

  function handleComplete() {
    if (!userData || programDone) return
    updateTrainingProgress(completedSessions + 1)
    setRestDismissed(false)
  }

  function handleReset() {
    if (!userData) return
    updateTrainingProgress(0)
    setRestDismissed(false)
  }

  function resetTrainingState() {
    setRestDismissed(false)
  }

  return {
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
  }
}
