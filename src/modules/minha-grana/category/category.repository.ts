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
        const categories = await this.model
            .aggregate()
            .search({
                index: 'minha-grana-api-category',
                compound: {
                    must: [
                        {
                            autocomplete: {
                                query: text,
                                path: 'name',
                                tokenOrder: 'sequential'
                            }
                        }
                    ],
                    filter: [
                        {
                            equals: {
                                path: 'userId',
                                value: userId
                            }
                        }
                    ]
                }
            })
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
