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

    async autocomplete(text: string, userId: string) {
        if (!text.trim()) {
            return this.model
                .find({ userId })
                .select('name')
                .sort({ name: 1 })
                .lean()
        }

        const categories = await this.model
            .aggregate()
            .search({
                index: 'minha-grana-api-category',
                autocomplete: {
                    query: text,
                    path: 'name',
                    tokenOrder: 'sequential'
                }
            })
            .match({ userId: userId })
            .project({
                name: 1,
                score: { $meta: 'searchScore' }
            })
            .sort({ score: -1 })
            .limit(5)
            .project({ score: 0 })

        return categories
    }
}

export const categoryRepository = new CategoryRepository()
