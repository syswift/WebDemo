import { NotFoundError, requireAuth, validateRequest } from '@syswift1/common';
import { body } from 'express-validator';
import express, {Request, Response} from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();


router.get('/api/tickets/:id', async (req: Request, res: Response) =>{
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        throw new NotFoundError();
    }

    res.send(Ticket);
});

export {router as showTicketRouter};