import { BaseRepository } from '@/core/repositories/base.repository'
import CategoryModel from './category.model'
import { toCategoryDTO, CategoryCreate, CategoryDTO, CategoryUpdate } from './category.entity'

class CategoryRepository extends BaseRepository<
    (typeof CategoryModel)['prototype'],
    CategoryDTO,
    CategoryCreate,
    CategoryUpdate
> {
    constructor() {
        super(CategoryModel, toCategoryDTO)
    }

    async findByName(name: string, userId: string) {
        return this.model.findOne({ name, userId }).exec()
    }
}

export const categoryRepository = new CategoryRepository()
