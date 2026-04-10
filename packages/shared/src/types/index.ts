// ============================================================
// TYPES — описывают форму всех данных в приложении
// ============================================================

export * from './auth.ts'

export interface WeekScheme { sets: number; reps: number }

export interface WarmupSet {
  label: string
  weight: number
  reps: number
  rest: string
  purpose: string
}

export interface ExerciseConfig {
  name: string
  type: 'A' | 'B' | 'C' | 'D'
  step: number
  warmupStep: number
  percentages: number[]
  weekSchemes: WeekScheme[]
  isPullup?: boolean
}

export interface SavedExercise {
  exerciseKey: string
  testWeight: number
  testReps: number
  oneRM: number
  date: string
  bodyWeight?: number
}

export interface TrainingProgress { completedSessions: number }

export interface UserData {
  name: string
  exercises: SavedExercise[]
  trainingProgress?: TrainingProgress
}

export interface TrainingDayDef { dayNumber: 1 | 2 | 3; name: string; exerciseKeys: string[] }

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
