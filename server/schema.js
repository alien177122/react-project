function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function isPositiveNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0
}

function invalid(message) {
  return { error: message }
}

function normalizeExerciseEntry(exercise) {
  if (!isRecord(exercise)) return null

  const exerciseKey = typeof exercise.exerciseKey === 'string' ? exercise.exerciseKey.trim() : ''
  const date = typeof exercise.date === 'string' ? exercise.date.trim() : ''
  if (!exerciseKey || !date) return null
  if (!isPositiveNumber(exercise.testWeight)) return null
  if (!isNonNegativeInteger(exercise.testReps) || exercise.testReps < 1) return null
  if (!isPositiveNumber(exercise.oneRM)) return null

  const normalized = {
    exerciseKey,
    testWeight: exercise.testWeight,
    testReps: exercise.testReps,
    oneRM: exercise.oneRM,
    date,
  }

  if (exercise.bodyWeight !== undefined && isPositiveNumber(exercise.bodyWeight)) {
    normalized.bodyWeight = exercise.bodyWeight
  }

  return normalized
}

export function normalizeStoredUserData(input, fallbackName) {
  if (!isRecord(input)) {
    return { name: fallbackName, exercises: [] }
  }

  const name = typeof input.name === 'string' && input.name.trim()
    ? input.name.trim()
    : fallbackName

  const exercises = Array.isArray(input.exercises)
    ? input.exercises
      .map(normalizeExerciseEntry)
      .filter(Boolean)
    : []

  if (isRecord(input.trainingProgress) && isNonNegativeInteger(input.trainingProgress.completedSessions)) {
    return {
      name,
      exercises,
      trainingProgress: { completedSessions: input.trainingProgress.completedSessions },
    }
  }

  return { name, exercises }
}

export function normalizeUserData(input, expectedName) {
  if (!isRecord(input)) return invalid('Некорректные данные пользователя')

  const name = typeof input.name === 'string' ? input.name.trim() : ''
  if (!name) return invalid('Некорректное имя пользователя')
  if (name !== expectedName) return invalid('Имя пользователя не совпадает с токеном')

  if (!Array.isArray(input.exercises)) {
    return invalid('Поле exercises должно быть массивом')
  }

  const exercises = []
  const seenKeys = new Set()

  for (const exercise of input.exercises) {
    if (!isRecord(exercise)) return invalid('Некорректная запись упражнения')

    const exerciseKey = typeof exercise.exerciseKey === 'string' ? exercise.exerciseKey.trim() : ''
    if (!exerciseKey) return invalid('У упражнения должен быть ключ')
    if (seenKeys.has(exerciseKey)) return invalid('Упражнения не должны дублироваться')
    seenKeys.add(exerciseKey)

    if (!isPositiveNumber(exercise.testWeight)) return invalid('Некорректный testWeight')
    if (!isNonNegativeInteger(exercise.testReps) || exercise.testReps < 1) return invalid('Некорректный testReps')
    if (!isPositiveNumber(exercise.oneRM)) return invalid('Некорректный oneRM')

    const date = typeof exercise.date === 'string' ? exercise.date.trim() : ''
    if (!date) return invalid('У упражнения должна быть дата')

    let bodyWeight
    if (exercise.bodyWeight !== undefined) {
      if (!isPositiveNumber(exercise.bodyWeight)) return invalid('Некорректный bodyWeight')
      bodyWeight = exercise.bodyWeight
    }

    exercises.push(normalizeExerciseEntry({
      exerciseKey,
      testWeight: exercise.testWeight,
      testReps: exercise.testReps,
      oneRM: exercise.oneRM,
      date,
      ...(bodyWeight !== undefined ? { bodyWeight } : {}),
    }))
  }

  if (input.trainingProgress !== undefined) {
    if (!isRecord(input.trainingProgress)) return invalid('Некорректный trainingProgress')
    if (!isNonNegativeInteger(input.trainingProgress.completedSessions)) {
      return invalid('completedSessions должен быть неотрицательным целым числом')
    }
  }

  return {
    data: {
      name,
      exercises,
      ...(input.trainingProgress !== undefined
        ? { trainingProgress: { completedSessions: input.trainingProgress.completedSessions } }
        : {}),
    },
  }
}
