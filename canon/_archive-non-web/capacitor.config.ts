import type {CapacitorConfig} from '@capacitor/cli';

const devServerUrl = process.env.CAP_DEV_SERVER_URL?.trim();

const config: CapacitorConfig = {
  appId: 'com.stevegordiyenko.trainingcalculator',
  appName: 'Training Calculator',
  webDir: 'dist',
  server: devServerUrl
    ? {
        url: devServerUrl,
        cleartext: true,
      }
    : undefined,
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
    backgroundColor: '#0a0a0b',
  },
  android: {
    backgroundColor: '#0a0a0b',
    allowMixedContent: Boolean(devServerUrl),
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 500,
      backgroundColor: '#0a0a0b',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0a0a0b',
    },
  },
};

export default config;
