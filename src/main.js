const { APP_PORT } = require('./config/config.default')
const app = require('./app/index')

app.listen(APP_PORT, () => {
  console.info(`http://localhost:${APP_PORT}`)
})
