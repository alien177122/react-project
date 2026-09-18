import {lazy, Suspense} from 'react';
import type {ProgramSettings, SavedExercise, UserData} from '../../types';
import type {BillingStatus} from '@training/shared/types/billing';
import CalculatorTab from '../../screens/CalculatorTab';
import type {AppTab} from './tabs';
import {TabPanelFallback} from './TabPanelFallback';

const TheoryTab = lazy(() => import('../TheoryTab'));
const JournalTab = lazy(() =>
  import('../../screens/JournalTab').then(module => ({default: module.JournalTab})),
);
const SplitConstructorTab = lazy(() =>
  import('../../screens/SplitConstructorTab').then(module => ({
    default: module.SplitConstructorTab,
  })),
);
const TrainingTabContainer = lazy(() => import('./TrainingTabContainer'));

interface TabPanelProps {
  activeTab: AppTab;
  userData: UserData;
  programSettings: ProgramSettings;
  journal: {
    setUserData: (value: UserData) => void;
    token: string;
    onSaveError: (message: string) => void;
  };
  split: {
    setUserData: (value: UserData) => void;
    token: string;
    onSaveError: (message: string) => void;
  };
  calculator: {
    token: string;
    billingStatus: BillingStatus | null;
    billingLoading: boolean;
    billingError?: string | null;
    billingPolling: boolean;
    checkoutDisabled?: boolean;
    onCheckout: () => void;
    onRefreshBilling: () => void;
    selectedExercise: string;
    selectExercise: (key: string) => void;
    testWeight: string;
    setTestWeight: (value: string) => void;
    testBodyWeight: string;
    setTestBodyWeight: (value: string) => void;
    testExtraWeight: string;
    setTestExtraWeight: (value: string) => void;
    testReps: string;
    setTestReps: (value: string) => void;
    activeResult: SavedExercise | null;
    isCalculating?: boolean;
    calculateError?: string | null;
    pendingLockedResult?: boolean;
    handleCalculate: () => void;
    handleDelete: (key: string) => void;
    handleSelectSaved: (saved: SavedExercise) => void;
  };
  training: {
    token: string;
    setUserData: (value: UserData | null) => void;
    onGoCalculator: () => void;
    programSubtitle?: string;
  };
}

function renderActiveTab(activeTab: AppTab, props: TabPanelProps) {
  const {userData, programSettings, calculator, training, journal, split} = props;

  switch (activeTab) {
    case 'calculator':
      return (
        <CalculatorTab userData={userData} programSettings={programSettings} {...calculator} />
      );
    case 'theory':
      return <TheoryTab />;
    case 'training':
      return (
        <TrainingTabContainer
          userData={userData}
          token={training.token}
          setUserData={training.setUserData}
          onGoCalculator={training.onGoCalculator}
          programSubtitle={training.programSubtitle}
        />
      );
    case 'split':
      return (
        <SplitConstructorTab
          userData={userData}
          setUserData={split.setUserData}
          token={split.token}
          onSaveError={split.onSaveError}
        />
      );
    case 'journal':
      return (
        <JournalTab
          userData={userData}
          setUserData={journal.setUserData}
          token={journal.token}
          onSaveError={journal.onSaveError}
        />
      );
    default:
      return null;
  }
}

export function TabPanel(props: TabPanelProps) {
  const {activeTab} = props;
  const isEagerTab = activeTab === 'calculator';

  return (
    <div key={activeTab} className="tab-panel tab-panel--enter">
      {isEagerTab ? (
        renderActiveTab(activeTab, props)
      ) : (
        <Suspense fallback={<TabPanelFallback tab={activeTab} />}>
          {renderActiveTab(activeTab, props)}
        </Suspense>
      )}
    </div>
  );
}
