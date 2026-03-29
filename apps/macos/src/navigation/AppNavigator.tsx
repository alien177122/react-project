import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Sidebar, type ScreenKey, type SidebarItem} from '../components/Sidebar';
import {useAuthContext} from '../providers/AuthProvider';
import {CalculatorScreen} from '../screens/CalculatorScreen';
import {FilesScreen} from '../screens/FilesScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {TheoryScreen} from '../screens/TheoryScreen';
import {TrainingScreen} from '../screens/TrainingScreen';
import {colors} from '../theme';

const items: SidebarItem[] = [
  {key: 'calculator', icon: '⌘', label: 'Калькулятор', note: '1ПМ, прогрессия и объём'},
  {key: 'training', icon: '▦', label: 'Тренировка', note: 'Циклы, дни и восстановление'},
  {key: 'theory', icon: '☰', label: 'Теория', note: 'mTOR, добавки и база'},
  {key: 'files', icon: '⌂', label: 'Файлы', note: 'Входящие, анализ и превью'},
];

export function AppNavigator(): React.JSX.Element {
  const {token, userName, sessionLoading} = useAuthContext();
  const [activeKey, setActiveKey] = useState<ScreenKey>('calculator');

  // Auth guard: show login if not authenticated
  if (sessionLoading || !token || !userName) {
    return <LoginScreen />;
  }

  const screen = (() => {
    switch (activeKey) {
      case 'training':
        return <TrainingScreen />;
      case 'theory':
        return <TheoryScreen />;
      case 'files':
        return <FilesScreen />;
      case 'calculator':
      default:
        return <CalculatorScreen />;
    }
  })();

  return (
    <View style={styles.root}>
      <Sidebar activeKey={activeKey} items={items} onSelect={setActiveKey} />
      <View style={styles.content}>{screen}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, flexDirection: 'row', backgroundColor: colors.bg},
  content: {flex: 1, backgroundColor: colors.bg},
});
