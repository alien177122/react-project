import type {LucideIcon} from 'lucide-react';
import {
  ArrowBigUp,
  BicepsFlexed,
  Footprints,
  GripVertical,
  Heart,
  Rows3,
} from 'lucide-react';
import type {SplitMuscleId} from '@training/shared/types';

/** Lucide pictogram per split muscle group — decorative; labels carry a11y text. */
export const SPLIT_MUSCLE_ICONS: Record<SplitMuscleId, LucideIcon> = {
  chest: Heart,
  back: Rows3,
  legs: Footprints,
  shoulders: ArrowBigUp,
  biceps: BicepsFlexed,
  triceps: GripVertical,
};
