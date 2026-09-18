import {calc1RM, roundOneRm} from './calc.js';
import {getExerciseConfig, isKnownExerciseKey} from './exerciseCatalog.js';

const WEIGHT_MIN = 0.5;
const WEIGHT_MAX = 1000;
const REPS_MIN = 1;
const REPS_MAX = 30;

function isPositiveNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function isNonNegativeNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value >= REPS_MIN;
}

export function validateCalculationBody(body) {
  if (!body || typeof body !== 'object') {
    return {error: 'Некорректное тело запроса'};
  }

  const exerciseKey = typeof body.exerciseKey === 'string' ? body.exerciseKey.trim() : '';
  const requestId = typeof body.requestId === 'string' ? body.requestId.trim() : '';
  const testReps = Number(body.testReps);

  if (!exerciseKey || !isKnownExerciseKey(exerciseKey)) {
    return {error: 'Неизвестное упражнение'};
  }
  if (!requestId || requestId.length > 128) {
    return {error: 'Некорректный requestId'};
  }
  if (!isPositiveInteger(testReps) || testReps > REPS_MAX) {
    return {error: 'Некорректное число повторений'};
  }

  const config = getExerciseConfig(exerciseKey);
  let testWeight;
  let bodyWeight;
  let extraWeight = 0;

  if (config.usesBodyWeight || config.isPullup) {
    bodyWeight = Number(body.testBodyWeight);
    extraWeight = body.testExtraWeight === undefined ? 0 : Number(body.testExtraWeight);
    if (!isPositiveNumber(bodyWeight) || bodyWeight < WEIGHT_MIN || bodyWeight > WEIGHT_MAX) {
      return {error: 'Некорректный вес тела'};
    }
    if (!isNonNegativeNumber(extraWeight) || extraWeight > WEIGHT_MAX) {
      return {error: 'Некорректный дополнительный вес'};
    }
    testWeight = bodyWeight + extraWeight;
  } else {
    testWeight = Number(body.testWeight);
    if (!isPositiveNumber(testWeight) || testWeight < WEIGHT_MIN || testWeight > WEIGHT_MAX) {
      return {error: 'Некорректный рабочий вес'};
    }
  }

  return {
    payload: {
      exerciseKey,
      requestId,
      testReps,
      testWeight,
      ...(bodyWeight !== undefined ? {bodyWeight} : {}),
      ...(extraWeight !== 0 ? {extraWeight} : {}),
    },
  };
}

export function computeOneRm(payload) {
  const oneRM = roundOneRm(calc1RM(payload.testWeight, payload.testReps));
  if (!(oneRM > 0)) {
    return {error: 'Не удалось рассчитать 1ПМ'};
  }
  return {oneRM};
}

export function mapHistoryRow(row) {
  return {
    id: row.id,
    exerciseKey: row.exercise_key,
    testWeight: row.test_weight,
    testReps: row.test_reps,
    oneRM: row.one_rm,
    ...(row.body_weight != null ? {bodyWeight: row.body_weight} : {}),
    createdAt: row.created_at,
  };
}
