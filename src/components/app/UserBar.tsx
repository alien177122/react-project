import type {ActiveProgram} from '../../types';
import {
  getPresetForActiveProgram,
  PROGRESSION_PRESET_META,
} from '@shared/program/progressionPresets';
import {Button} from '../ui/Button';

interface UserBarProps {
  userName: string;
  onLogout: () => void;
  activeProgram?: ActiveProgram;
  v3Enabled?: boolean;
  onChangeProgram?: () => void;
}

export function UserBar({
  userName,
  onLogout,
  activeProgram = '2.0',
  v3Enabled = false,
  onChangeProgram,
}: UserBarProps) {
  const programLabel =
    PROGRESSION_PRESET_META[getPresetForActiveProgram(activeProgram)].programLabel;

  return (
    <div className="user-bar">
      <div className="user-bar-identity">
        <span className="user-bar-label">Атлет</span>
        <span className="user-bar-name">{userName}</span>
        {v3Enabled ? <span className="user-bar__program">{programLabel}</span> : null}
      </div>
      <div className="user-bar-actions">
        {v3Enabled && onChangeProgram ? (
          <Button size="sm" variant="ghost" onClick={onChangeProgram}>
            Сменить программу
          </Button>
        ) : null}
        <Button size="sm" variant="ghost" onClick={onLogout}>
          Выйти
        </Button>
      </div>
    </div>
  );
}
