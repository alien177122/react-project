/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it, jest} from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: async () => null,
    setItem: async () => {},
    removeItem: async () => {},
  },
}));

jest.mock('../src/providers/AuthProvider', () => ({
  __esModule: true,
  AuthProvider: ({children}: {children: unknown}) => children,
}));

jest.mock('../src/navigation/AppNavigator', () => ({
  __esModule: true,
  AppNavigator: () => null,
}));

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  await renderer.act(async () => {
    renderer.create(<App />);
  });
});
