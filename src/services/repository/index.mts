import { Model } from 'mongoose'
import {
    Readable,
    Deletable,
    Creatable,
    Updatable,
    Paginatable
} from './Repository.interface.mjs'

export default class Repository<T>
    implements
        Readable<T>,
        Deletable,
        Creatable<T>,
        Updatable<T>,
        Paginatable<T>
{
    constructor(private model: Model<T>) {}

    async readOne(id: string): Promise<T | null> {
        return this.model.findById(id).exec()
    }

    async readMany(
        filter: Partial<T>,
        page?: number,
        limit?: number
    ): Promise<{
        data: T[]
        totalItems: number
        totalPages: number
        currentPage: number
    }> {
        // If pagination parameters are provided, use the paginate method
        if (page !== undefined && limit !== undefined) {
            return this.paginate(page, limit, filter)
        }

        // Otherwise, return all matching elements without pagination
        const data = await this.model.find(filter).exec()
        return {
            data,
            totalItems: data.length,
            totalPages: 1,
            currentPage: 1
        }
    }

    async readAll(
        page?: number,
        limit?: number
    ): Promise<{
        data: T[]
        totalItems: number
        totalPages: number
        currentPage: number
    }> {
        // Use the paginate method if pagination parameters are provided
        if (page !== undefined && limit !== undefined) {
            return this.paginate(page, limit)
        }

        // Otherwise, return all elements without pagination
        const data = await this.model.find().exec()
        return {
            data,
            totalItems: data.length,
            totalPages: 1,
            currentPage: 1
        }
    }

    async deleteOne(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec()
        return result !== null
    }

    async deleteMany(filter: Record<string, any>): Promise<number> {
        const result = await this.model.deleteMany(filter).exec()
        return result.deletedCount || 0
    }

    async createOne(item: T): Promise<T> {
        return this.model.create(item)
    }

    async createMany(items: T[]): Promise<T[]> {
        return this.model.insertMany(items)
    }

    async updateOne(id: string, updates: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, updates, { new: true }).exec()
    }

    async updateMany(
        filter: Record<string, any>,
        updates: Partial<T>
    ): Promise<number> {
        const result = await this.model.updateMany(filter, updates).exec()
        return result.modifiedCount
    }

    async paginate(
        page: number,
        limit: number,
        filter: Partial<T> = {}
    ): Promise<{
        data: T[]
        totalItems: number
        totalPages: number
        currentPage: number
    }> {
        const totalItems = await this.model.countDocuments(filter).exec()
        const totalPages = Math.ceil(totalItems / limit)
        const data = await this.model
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec()

        return {
            data,
            totalItems,
            totalPages,
            currentPage: page
        }
    }
}
