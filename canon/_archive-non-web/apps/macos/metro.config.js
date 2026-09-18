const path = require('node:path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const sharedRoot = path.resolve(__dirname, '../../packages/shared');
const projectNodeModules = path.resolve(__dirname, 'node_modules');

const config = {
  watchFolders: [sharedRoot],
  resolver: {
    unstable_enablePackageExports: true,
    // Ensure shared code resolves node_modules from this project
    nodeModulesPaths: [projectNodeModules],
    // Disable package exports resolution for .ts files (use sourceExts)
    disableHierarchicalLookup: false,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
