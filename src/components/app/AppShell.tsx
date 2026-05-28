import {useCallback, useMemo, useState, type CSSProperties} from 'react';
import {getTrainingDaysV3} from '@shared/program/v3';
import {resolveProgramSettings} from '@shared/program/resolveProgramSettings';
import {
  applyProgramSettingsPatch,
  getDefaultDaysForPreset,
  getPresetForActiveProgram,
} from '@shared/program/progressionPresets';
import {useKeyboardAvoid} from '../../hooks/useKeyboardAvoid';
import {HeroSection} from '../ui/HeroSection';
import {OpenGraph} from '../seo/OpenGraph';
import AuthScreen from '../../screens/AuthScreen';
import {ProgramSelectorScreen} from '../../screens/ProgramSelectorScreen';
import {useAuthSession} from '../../hooks/useAuthSession';
import {useCalculatorState} from '../../hooks/useCalculatorState';
import {useTrainingProgram} from '../../hooks/useTrainingProgram';
import {useTrainingProgramV3} from '../../hooks/useTrainingProgramV3';
import {useURLState} from '../../hooks/useURLState';
import type {ActiveProgram} from '../../types';
import {
  getActiveProgram,
  isProgramV3Enabled,
  shouldPromptProgramSelector,
} from '../../utils/programV3';
import {saveUser} from '../../utils/api';
import {LoadingView} from './LoadingView';
import {TabNav} from './TabNav';
import {TabPanel} from './TabPanel';
import {UserBar} from './UserBar';
import {isAppTab, type AppTab} from './tabs';
import {usePageMeta} from '../../hooks/usePageMeta';
import '../../styles/animations.css';

export function AppShell() {
  const pageMeta = usePageMeta();
  const auth = useAuthSession();
  const [saveToast, setSaveToast] = useState('');
  const [programSelectorOpen, setProgramSelectorOpen] = useState(false);

  const handleSaveError = useCallback((message: string) => {
    setSaveToast(message || 'Не удалось сохранить данные');
    window.setTimeout(() => setSaveToast(''), 4000);
  }, []);

  const {keyboardHeight} = useKeyboardAvoid();
  const tabState = useURLState<AppTab>('tab');
  const activeTab = isAppTab(tabState.value) ? tabState.value : 'calculator';
  const shellStyle = {
    '--keyboard-inset': `${keyboardHeight}px`,
  } as CSSProperties;

  const calculator = useCalculatorState({
    token: auth.token,
    userName: auth.userName,
    userData: auth.userData,
    setUserData: auth.setUserData,
  });

  const trainingV2 = useTrainingProgram({
    token: auth.token,
    userData: auth.userData,
    setUserData: auth.setUserData,
  });

  const trainingV3 = useTrainingProgramV3({
    token: auth.token,
    userData: auth.userData,
    setUserData: auth.setUserData,
  });

  const activeProgram = getActiveProgram(auth.userData);
  const isV3 = activeProgram === '3.0';
  const programSettings = resolveProgramSettings(auth.userData, activeProgram);
  const training = isV3 ? trainingV3 : trainingV2;

  const heroCopy = useMemo(() => {
    if (isV3) {
      return {
        title: 'ПЕРИОДИЗАЦИЯ RPE–RIR',
        subtitle: `На силу · Brzycki · ${programSettings.daysPerWeek} дня · RPE/RIR · тестовые недели 4 / 8 / 12 / 16`,
      };
    }
    return {
      title: 'ПЕРИОДИЗАЦИЯ RPE–RIR',
      subtitle: `Оптимальная · ${programSettings.daysPerWeek} дня · введи тестовый вес — калькулятор построит рабочие веса на 8 недель`,
    };
  }, [isV3, programSettings.daysPerWeek]);

  function updateProgramSettings(patch: Partial<typeof programSettings>) {
    if (!auth.userData || !auth.token) return;

    const {programSettings: nextSettings, activeProgram: nextProgram} = applyProgramSettingsPatch(
      programSettings,
      patch,
    );

    const updated = {
      ...auth.userData,
      activeProgram: nextProgram,
      programSettings: nextSettings,
    };
    auth.setUserData(updated);
    void saveUser(updated, auth.token).catch(() => {
      handleSaveError('Не удалось сохранить настройки программы');
    });
  }

  function changeTab(tab: AppTab) {
    tabState.setValue(tab);
  }

  function handleLogout() {
    void auth.handleLogout();
    calculator.resetCalculatorState();
    trainingV2.resetTrainingState();
    trainingV3.resetTrainingState();
    changeTab('calculator');
  }

  function persistActiveProgram(program: ActiveProgram) {
    if (!auth.userData || !auth.token) return;

    const preset = getPresetForActiveProgram(program);
    const updated = {
      ...auth.userData,
      activeProgram: program,
      programSettings: {
        progressionPreset: preset,
        daysPerWeek: getDefaultDaysForPreset(preset),
      },
    };
    auth.setUserData(updated);
    void saveUser(updated, auth.token).catch(() => {
      handleSaveError('Не удалось сохранить выбор программы');
    });
    setProgramSelectorOpen(false);
  }

  if (auth.sessionLoading) {
    return <LoadingView message="Восстанавливаем сессию..." />;
  }

  if (!auth.userName || !auth.token) {
    return (
      <>
        <OpenGraph {...pageMeta} />
        <AuthScreen
          authMode={auth.authMode}
          setAuthMode={auth.setAuthMode}
          nameInput={auth.nameInput}
          setNameInput={auth.setNameInput}
          passInput={auth.passInput}
          setPassInput={auth.setPassInput}
          pass2Input={auth.pass2Input}
          setPass2Input={auth.setPass2Input}
          authError={auth.authError}
          setAuthError={auth.setAuthError}
          authLoading={auth.authLoading}
          handleAuth={auth.handleAuth}
        />
      </>
    );
  }

  if (!auth.userData) {
    return <LoadingView message={auth.sessionError || 'Загрузка данных...'} />;
  }

  const showSelector = programSelectorOpen || shouldPromptProgramSelector(auth.userData);

  return (
    <div className="app-shell" style={shellStyle}>
      <OpenGraph {...pageMeta} />
      <HeroSection
        className="app-hero"
        label="Тренировочный калькулятор"
        title={heroCopy.title}
        subtitle={heroCopy.subtitle}
      />
      <UserBar
        userName={auth.userName}
        activeProgram={activeProgram}
        v3Enabled={isProgramV3Enabled()}
        onLogout={handleLogout}
        onChangeProgram={() => setProgramSelectorOpen(true)}
      />
      <TabNav
        activeTab={activeTab}
        allSaved={training.allSaved}
        savedCount={auth.userData.exercises.length}
        onTabChange={changeTab}
      />
      <TabPanel
        activeTab={activeTab}
        activeProgram={activeProgram}
        userData={auth.userData}
        programSettings={programSettings}
        onProgramSettingsChange={updateProgramSettings}
        calculator={calculator}
        training={{
          ...training,
          onGoCalculator: () => changeTab('calculator'),
          totalSessions: training.totalSessions,
          trainingDays: isV3 ? getTrainingDaysV3(programSettings.daysPerWeek) : undefined,
          programSubtitle: isV3
            ? `16 недель · ${programSettings.daysPerWeek} дня · на силу`
            : `8 недель · ${programSettings.daysPerWeek} дня · волновая прогрессия`,
        }}
        journal={{
          setUserData: value => auth.setUserData(value),
          token: auth.token,
          onSaveError: handleSaveError,
        }}
        split={{
          setUserData: value => auth.setUserData(value),
          token: auth.token,
          onSaveError: handleSaveError,
        }}
      />
      {saveToast ? (
        <p className="app-toast" role="alert">
          {saveToast}
        </p>
      ) : null}
      {showSelector && isProgramV3Enabled() ? (
        <ProgramSelectorScreen
          userData={auth.userData}
          onSelect={persistActiveProgram}
          onDismiss={() => {
            if (!auth.userData?.activeProgram) {
              persistActiveProgram('2.0');
            } else {
              setProgramSelectorOpen(false);
            }
          }}
        />
      ) : null}
    </div>
  );
}
