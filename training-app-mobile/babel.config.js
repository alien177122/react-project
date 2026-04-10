const fs = require('fs')
const path = require('path')

module.exports = function(api) {
  api.cache(true)

  const localPreset = path.join(
    __dirname,
    'node_modules',
    'babel-preset-expo',
    'build',
    'index.js'
  )

  if (!fs.existsSync(localPreset)) {
    throw new Error(
      `Missing local babel-preset-expo at ${localPreset}. Run the training-app-mobile npm scripts to materialize it.`
    )
  }

  return {
    presets: [localPreset],
  }
}
