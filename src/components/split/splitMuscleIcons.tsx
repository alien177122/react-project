import type {SplitMuscleId} from '@training/shared/types';
import {SPLIT_MUSCLE_ICONS} from './splitMuscleIconMap';

interface SplitMuscleIconProps {
  muscle: SplitMuscleId;
  className?: string;
}

export function SplitMuscleIcon({muscle, className}: SplitMuscleIconProps) {
  const Icon = SPLIT_MUSCLE_ICONS[muscle];
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
