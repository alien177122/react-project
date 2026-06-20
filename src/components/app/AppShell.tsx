import {useCallback, useMemo, useState, type CSSProperties} from 'react';
import {resolveProgramSettings} from '@shared/program/resolveProgramSettings';
import {useKeyboardAvoid} from '../../hooks/useKeyboardAvoid';
import {HeroSection} from '../ui/HeroSection';
import {OpenGraph} from '../seo/OpenGraph';
import AuthScreen from '../../screens/AuthScreen';
import {useAuthSession} from '../../hooks/useAuthSession';
import {useCalculatorState} from '../../hooks/useCalculatorState';
import {useTrainingProgram} from '../../hooks/useTrainingProgram';
import {useURLState} from '../../hooks/useURLState';
import {PROGRAM_DAYS_PER_WEEK} from '../../types';
import {saveUser} from '../../utils/api';
import {LoadingView} from './LoadingView';
import {TabNav} from './TabNav';
import {TabPanel} from './TabPanel';
import {UserBar} from './UserBar';
import {isAppTab, type AppTab} from './tabs';
import {usePageMeta} from '../../hooks/usePageMeta';
import {ThemeToggle} from '../shared/ThemeToggle';
import '../../styles/animations.css';

export function AppShell() {
  const pageMeta = usePageMeta();
  const auth = useAuthSession();
  const [saveToast, setSaveToast] = useState('');
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

  const training = useTrainingProgram({
    token: auth.token,
    userData: auth.userData,
    setUserData: auth.setUserData,
  });

  const programSettings = resolveProgramSettings(auth.userData);

  const heroCopy = useMemo(
    () => ({
      title: 'ПЕРИОДИЗАЦИЯ RPE–RIR',
      subtitle: `Оптимальная · ${PROGRAM_DAYS_PER_WEEK} дня · введи тестовый вес — калькулятор построит рабочие веса на 8 недель`,
    }),
    [],
  );

  const handleSaveError = useCallback((message: string) => {
    setSaveToast(message || 'Не удалось сохранить данные');
    window.setTimeout(() => setSaveToast(''), 4000);
  }, []);

  function updateProgramSettings() {
    if (!auth.userData || !auth.token) return;

    const updated = {
      ...auth.userData,
      activeProgram: '2.0' as const,
      programSettings,
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
    training.resetTrainingState();
    changeTab('calculator');
  }

  if (auth.sessionLoading) {
    return (
      <>
        <ThemeToggle />
        <LoadingView message="Восстанавливаем сессию..." />
      </>
    );
  }

  if (!auth.userName || !auth.token) {
    return (
      <>
        <ThemeToggle />
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
    return (
      <>
        <ThemeToggle />
        <LoadingView message={auth.sessionError || 'Загрузка данных...'} />
      </>
    );
  }

  return (
    <div className="app-shell" style={shellStyle}>
      <ThemeToggle />
      <OpenGraph {...pageMeta} />
      <HeroSection
        className="app-hero"
        label="Тренировочный калькулятор"
        title={heroCopy.title}
        subtitle={heroCopy.subtitle}
      />
      <UserBar userName={auth.userName} onLogout={handleLogout} />
      <TabNav
        activeTab={activeTab}
        allSaved={training.allSaved}
        savedCount={auth.userData.exercises.length}
        onTabChange={changeTab}
      />
      <TabPanel
        activeTab={activeTab}
        userData={auth.userData}
        programSettings={programSettings}
        onProgramSettingsChange={updateProgramSettings}
        calculator={calculator}
        training={{
          ...training,
          onGoCalculator: () => changeTab('calculator'),
          totalSessions: training.totalSessions,
          programSubtitle: `8 недель · ${PROGRAM_DAYS_PER_WEEK} дня · волновая прогрессия`,
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
    </div>
  );
}
