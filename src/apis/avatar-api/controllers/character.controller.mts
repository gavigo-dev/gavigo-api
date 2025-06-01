import Repository from '../../../services/repository/index.mjs'
import responseHandler from '../../../services/responseHandler/index.mjs'

import CharacterModel from '../models/Character.model.mjs'

const repository = new Repository(CharacterModel)

export const findAll = responseHandler(async ({ req }: any) => {
    const { page, limit } = req.query
    console.log(page, limit)
    return await repository.readAll(page, limit)
})
