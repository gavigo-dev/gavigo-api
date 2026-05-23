import { BaseRepository } from '@/core/repositories/base.repository'
import BillingModel from './billing.model'
import { toBillingDTO, BillingCreate, BillingDTO, BillingUpdate } from './billing.entity'

class BillingRepository extends BaseRepository<
    (typeof BillingModel)['prototype'],
    BillingDTO,
    BillingCreate,
    BillingUpdate
> {
    constructor() {
        super(BillingModel, toBillingDTO)
    }
}

export const billingRepository = new BillingRepository()
