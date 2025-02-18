import z from 'zod'

export const transactionSchema = z.object({
    date : z.string(),
    description : z.string(),
    type : z.enum(['Debit', 'Credit']),
    amount : z.number()
})