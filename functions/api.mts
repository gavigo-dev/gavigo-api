import serverless from 'serverless-http'
import { viteNodeApp as app } from '../src/server'

export const handler = serverless(app)
