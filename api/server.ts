// Sloppy API Server 😅

import app from './app'
import env from './config/env'
import router from './router'

const port = env.PORT

app.use('/', router)

app.listen(port, () =>
  console.log(`Server running at port http://localhost:${port}`)
)
