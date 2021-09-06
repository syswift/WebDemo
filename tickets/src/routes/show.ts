import { NotFoundError } from '@syswift1/common';
import express, {Request, Response} from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) =>{
    //console.log(req.params.id);
    const ticket = await Ticket.findById(req.params.id);
    //console.log(ticket);

    if(!ticket) {
        throw new NotFoundError();
    }

    res.send(ticket);
});

export {router as showTicketRouter};