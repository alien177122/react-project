import { createApp } from './app.js'
import { getServerConfig } from './config.js'

const config = getServerConfig(process.env)
const app = createApp({ env: process.env })

app.listen(config.port, '0.0.0.0', () => {
  console.log(`API → http://localhost:${config.port}`)
})
