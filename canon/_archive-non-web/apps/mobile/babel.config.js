module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    // Ensure router env inlining even when babel-preset-expo can't resolve
    // expo-router from the monorepo root (hasModule check).
    plugins: [require('babel-preset-expo/build/expo-router-plugin').expoRouterBabelPlugin],
  };
};
