import 'dotenv/config'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { signupUser } from '../../src/modules/auth/auth.service.mjs'

faker.seed(123) // para resultados reproduzíveis

async function seedUsers() {
    const password = 'teste123'

    for (let i = 0; i < 100; i++) {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const name = `${firstName} ${lastName}`

        const email = faker.internet
            .email({
                firstName,
                lastName,
                provider: 'gmail.com'
            })
            .toLowerCase()

        const phone = faker.phone.number({ style: 'national' })

        const nickname =
            Math.random() > 0.5
                ? faker.internet.username({ firstName })
                : undefined

        try {
            await signupUser({
                name,
                email,
                password,
                phone,
                nickname
            })

            console.log(`✅ Criado: ${name} <${email}>`)
        } catch (error) {
            console.error(`❌ Erro ao criar ${name}:`, error)
        }
    }

    console.log('✅ 100 usuários criados com sucesso!')
}

seedUsers()

// console.log(process.env.ATLAS_URI)
