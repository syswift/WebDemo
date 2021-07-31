import { requireAuth, validateRequest } from '@syswift1/common';
import { body } from 'express-validator';
import express, {Request, Response} from 'express';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than 0')
], validateRequest, (req: Request, res: Response) => {
    res.sendStatus(201);
});

export {router as createTicketRouter };