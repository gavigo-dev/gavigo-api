export interface Readable<T> {
    /**
     * Fetches a single element by its unique identifier.
     * @param id - The unique identifier of the element.
     * @returns A promise resolving to the element or `null` if not found.
     */
    readOne(id: string): Promise<T | null>

    /**
     * Fetches multiple elements based on the filter criteria, with optional pagination.
     * @param filter - An object containing the filter conditions.
     * @param page - Optional page number for pagination (1-based index).
     * @param limit - Optional number of elements per page.
     * @returns A promise resolving to an object containing the data and pagination metadata.
     */
    readMany(
        filter: Partial<T>,
        page?: number,
        limit?: number
    ): Promise<{
        data: T[]
        totalItems: number
        totalPages: number
        currentPage: number
    }>

    /**
     * Fetches all elements, with optional pagination.
     * @param page - Optional page number for pagination (1-based index).
     * @param limit - Optional number of elements per page.
     * @returns A promise resolving to an object containing the data and pagination metadata.
     */
    readAll(
        page?: number,
        limit?: number
    ): Promise<{
        data: T[]
        totalItems: number
        totalPages: number
        currentPage: number
    }>
}

export interface Deletable {
    /**
     * Deletes a single element by its unique identifier.
     * @param id - The unique identifier of the element.
     * @returns A promise resolving to `true` if the element was deleted, or `false` otherwise.
     */
    deleteOne(id: string): Promise<boolean>

    /**
     * Deletes multiple elements matching specific criteria.
     * @param filter - An object containing the filter conditions.
     * @returns A promise resolving to the number of deleted elements.
     */
    deleteMany(filter: Record<string, any>): Promise<number>
}

export interface Creatable<T> {
    /**
     * Creates a single new element.
     * @param item - The element to be created.
     * @returns A promise resolving to the created element.
     */
    createOne(item: T): Promise<T>

    /**
     * Creates multiple new elements.
     * @param items - An array of elements to be created.
     * @returns A promise resolving to an array of created elements.
     */
    createMany(items: T[]): Promise<T[]>
}

export interface Updatable<T> {
    /**
     * Updates a single element by its unique identifier.
     * @param id - The unique identifier of the element.
     * @param updates - An object containing the fields to be updated.
     * @returns A promise resolving to the updated element or `null` if not found.
     */
    updateOne(id: string, updates: Partial<T>): Promise<T | null>

    /**
     * Updates multiple elements matching specific criteria.
     * @param filter - An object containing the filter conditions.
     * @param updates - An object containing the fields to be updated.
     * @returns A promise resolving to the number of updated elements.
     */
    updateMany(
        filter: Record<string, any>,
        updates: Partial<T>
    ): Promise<number>
}

export interface Paginatable<T> {
    /**
     * Fetches paginated results based on the provided options.
     * @param page - The current page number (1-based index).
     * @param limit - The number of elements per page.
     * @param filter - An optional object containing filter conditions.
     * @returns A promise resolving to the paginated results and metadata.
     */
    paginate(
        page: number,
        limit: number,
        filter?: Partial<T>
    ): Promise<{
        data: T[]
        totalItems: number
        totalPages: number
        currentPage: number
    }>
}
