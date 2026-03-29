import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AppNavigator} from './src/navigation/AppNavigator';
import {AuthProvider} from './src/providers/AuthProvider';
import {colors} from './src/theme';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.app}>
        <AppNavigator />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  app: {flex: 1, backgroundColor: colors.bg},
});

export default App;
