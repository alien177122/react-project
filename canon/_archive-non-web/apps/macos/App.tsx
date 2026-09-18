import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppNavigator} from './src/navigation/AppNavigator';
import {AuthProvider} from './src/providers/AuthProvider';
import {colors} from './src/theme';

declare const __DEV__: boolean;

function App(): React.JSX.Element {
  useEffect(() => {
    if (!__DEV__) return;

    try {
      // Avoid stale RN macOS dev overlay stuck at "Downloading 100%..."
      const loadingView = require('react-native/Libraries/Utilities/DevLoadingView')?.default;
      loadingView?.hide?.();
    } catch {
      // No-op: module is internal and may be absent in some builds.
    }
  }, []);

  return (
    <AuthProvider>
      <View style={styles.app}>
        <AppNavigator />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  app: {flex: 1, backgroundColor: colors.bg},
});

export default App;
