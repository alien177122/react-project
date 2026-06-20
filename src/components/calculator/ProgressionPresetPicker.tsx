import type {ProgramSettings} from '../../types';
import ProgressionPreviewChart from './ProgressionPreviewChart';

interface ProgressionPresetPickerProps {
  settings: ProgramSettings;
  onChange?: (patch: Partial<ProgramSettings>) => void;
  showDaysPerWeek?: boolean;
  showPreview?: boolean;
}

/** Single optimal track · 2 days/week — no toggles; chart preview only. */
export default function ProgressionPresetPicker({
  settings,
  showPreview = true,
}: ProgressionPresetPickerProps) {
  if (!showPreview) return null;

  return (
    <div className="progression-controls program-settings">
      <ProgressionPreviewChart settings={settings} />
    </div>
  );
}
