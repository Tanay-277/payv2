import express, { Request, Response, Router } from 'express';
import { getTransaction, transfer } from '../controllers/transactions.controller';

const transactions: Router = express.Router();

transactions.get('/', (req: Request, res: Response) => {
    res.send('transactions here');
});

transactions.post("/transfer", transfer)
transactions.get("/transfer/:id", getTransaction)

export default transactions;
