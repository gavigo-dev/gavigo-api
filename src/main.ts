import 'dotenv/config'

import { viteNodeApp as app } from './server'

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})

export const viteNodeApp = app
