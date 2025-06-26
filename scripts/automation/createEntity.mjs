import fs from 'node:fs'
import { config } from './config.mjs'

function replaceTexts(content) {
    let c = content
    for (const key in config.replaces) {
        const element = config.replaces[key]
        console.log(key, element)

        c = c.replaceAll(`{{${key}}}`, element)
    }
    console.log(c)
    return c
}

async function main() {
    config.templateFiles.forEach((file) => {
        const tempPath = `scripts/automation/templates/${file}.txt`
        const content = fs.readFileSync(tempPath).toString()
        const text = replaceTexts(content)

        const finalPath =
            config.paths.absolute +
            config.replaces.entityMini +
            '/' +
            config.replaces.entityMini +
            '.' +
            file +
            '.ts'

        fs.writeFileSync(finalPath, text, 'utf-8')
    })
}

function test(file) {
    const tempPath = `scripts/automation/templates/${file}.txt`
    const content = fs.readFileSync(tempPath).toString()
    const text = replaceTexts(content)

    const finalPath =
        config.paths.absolute + config.replaces.entityMini + '/' + file + '.ts'

    fs.writeFileSync(finalPath, text, 'utf-8')
}

main()

// test('controller')
