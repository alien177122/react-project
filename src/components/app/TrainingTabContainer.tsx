import TrainingTab from '../../screens/TrainingTab';
import '../../styles/tabs/training-tab.css';
import {useTrainingProgram} from '../../hooks/useTrainingProgram';
import {PROGRAM_DAYS_PER_WEEK} from '../../types';
import type {UserData} from '../../types';

interface TrainingTabContainerProps {
  userData: UserData;
  token: string;
  setUserData: (value: UserData | null) => void;
  onGoCalculator: () => void;
  programSubtitle?: string;
}

/** Lazy boundary: keeps training program logic out of the initial shell chunk. */
export default function TrainingTabContainer({
  userData,
  token,
  setUserData,
  onGoCalculator,
  programSubtitle = `8 недель · ${PROGRAM_DAYS_PER_WEEK} дня · волновая прогрессия`,
}: TrainingTabContainerProps) {
  const training = useTrainingProgram({
    token,
    userData,
    setUserData,
  });

  return (
    <TrainingTab
      userData={userData}
      {...training}
      onGoCalculator={onGoCalculator}
      totalSessions={training.totalSessions ?? 16}
      programSubtitle={programSubtitle}
    />
  );
}
