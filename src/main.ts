import 'dotenv/config'

import { viteNodeApp as app } from './server'

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...')
    console.error(err.name, err.message)
    // Perform cleanup operations if needed (e.g., close database connections)
    process.exit(1) // Exit with a non-zero code to indicate an error
})

export const viteNodeApp = app
