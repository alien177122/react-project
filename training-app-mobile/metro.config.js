const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const sharedRoot = path.resolve(projectRoot, '../packages/shared')

const config = getDefaultConfig(projectRoot)

config.watchFolders = [sharedRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(projectRoot, '../node_modules'),
]
config.resolver.extraNodeModules = {
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-dom': path.resolve(projectRoot, 'node_modules/react-dom'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-helmet-async': path.resolve(projectRoot, 'shims/react-native-helmet-async'),
  'react-native-web': path.resolve(projectRoot, 'node_modules/react-native-web'),
}
config.resolver.unstable_enablePackageExports = true

module.exports = config
