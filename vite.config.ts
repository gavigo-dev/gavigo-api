import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        ...VitePluginNode({
            adapter: 'express',
            appPath: './src/main.ts', // Express app export file (you will create this)
            exportName: 'viteNodeApp' // Must match the export in server.ts
        })
    ],
    server: {
        port: 8888
    }
})
