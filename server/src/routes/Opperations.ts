import { Router, Request, Response } from 'express';
import AccountOperation, { Opperation } from '../models/AccountOpperation'

const operationsRoutes = Router();

operationsRoutes.get("/:accountNumber", async (req: Request, res: Response) => {
    try {
        const { accountNumber } = req.params;
        const operations: Opperation[] = await AccountOperation.find({ accountNumber });
        res.json(operations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching operations', error });
    }
})

operationsRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { accountNumber, type, amount, interest, payment } = req.body;
        const newOperation = new AccountOperation({
            accountNumber,
            type,
            amount,
            interest: type === 'loan' ? interest : null,
            payment: type === 'loan' ? payment : null
        });
        const savedOperation = await newOperation.save();
        res.status(201).json(savedOperation);
    } catch (error) {
        res.status(400).json({ message: 'Error creating operation', error });
    }
})

export default operationsRoutes;