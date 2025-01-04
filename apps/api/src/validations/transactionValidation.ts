import { z } from "zod";

const transactionIdSchema = z.string().uuid();

const transferSchema = z.object({
    from: z.string().uuid({ message: "Invalid UUID format for 'from' field" }),
    to: z.string().uuid({ message: "Invalid UUID format for 'to' field" }),
    amount: z.coerce.number().positive({ message: "Amount must be a positive number" })
});

export { transactionIdSchema,transferSchema };