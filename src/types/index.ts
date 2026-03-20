// ============================================================
// TYPES — описывают форму всех данных в приложении
// ============================================================

// Схема подхода для одной недели: сколько подходов x сколько повторений
export interface WeekScheme { sets: number; reps: number }

// Конфиг упражнения: имя, тип округления, шаг, проценты и схемы на 8 недель
export interface ExerciseConfig {
  name: string; type: 'A' | 'B' | 'C' | 'D'
  step: number; warmupStep: number
  percentages: number[]; weekSchemes: WeekScheme[]
  isPullup?: boolean // особый флаг: вес = тело + доп. вес
}

// Сохранённый тестовый подход и рассчитанный 1ПМ пользователя
export interface SavedExercise {
  exerciseKey: string; testWeight: number; testReps: number; oneRM: number; date: string
  bodyWeight?: number // только для подтягиваний — вес тела для отображения прибавки
}

// Прогресс по 8-недельному циклу: единый счётчик завершённых тренировок
export interface TrainingProgress { completedSessions: number }

// Данные пользователя, хранящиеся на сервере
export interface UserData {
  name: string; exercises: SavedExercise[]; trainingProgress?: TrainingProgress
}

// Описание тренировочного дня: какие упражнения входят
export interface TrainingDayDef { dayNumber: 1|2|3; name: string; exerciseKeys: string[] }

// Метаданные мышцы для VolumeDonut
export interface MuscleMeta { label: string; color: string; catKey: string }

export interface FileWorkspacePaths {
  baseDir: string
  inboxDir: string
  analysisDir: string
}

export interface FileWorkspaceOcrConfig {
  baseUrl: string
  model: string
}

export interface FileAnalysis {
  kind: string
  summary: string
  preview: string
  metadata: Record<string, string | number | boolean>
  suggestedUse: string[]
  generatedAt: string
  source: {
    name: string
    relativePath: string
    sizeBytes: number
    sizeLabel: string
    modifiedAt: string
  }
}

export interface WorkspaceFileEntry {
  name: string
  relativePath: string
  extension: string
  sizeBytes: number
  sizeLabel: string
  modifiedAt: string
  hasAnalysis: boolean
  analysis: FileAnalysis | null
}

export interface FileWorkspaceResponse {
  paths: FileWorkspacePaths
  ocr: FileWorkspaceOcrConfig
  files: WorkspaceFileEntry[]
}
