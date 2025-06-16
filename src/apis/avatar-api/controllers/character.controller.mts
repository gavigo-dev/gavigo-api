import responseHandler from '../../../core/handlers/ResponseHandler.mjs'
import Repository from '../../../core/operations/Repository.mjs'

import CharacterModel from '../models/Character.model.mjs'

const repository = new Repository(CharacterModel)

export const findAll = responseHandler(async ({ req }: any) => {
    const { page, limit } = req.query
    console.log(page, limit)
    const data = await repository.readAll(page, limit)
    return { data }
})
