import { BaseRepository } from '@/core/repositories/base.repository'
import TransactionModel from './transaction.model'
import { toTransactionDTO, TransactionCreate, TransactionDTO, TransactionUpdate } from './transaction.entity'

class TransactionRepository extends BaseRepository<
    (typeof TransactionModel)['prototype'],
    TransactionDTO,
    TransactionCreate,
    TransactionUpdate
> {
    constructor() {
        super(TransactionModel, toTransactionDTO)
    }
}

export const transactionRepository = new TransactionRepository()
