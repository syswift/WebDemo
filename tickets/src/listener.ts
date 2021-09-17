import nats, {Message, Stan} from 'node-nats-streaming';
import {randomBytes} from 'crypto';
import {TicketCreatedListener} from './event/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './event/listeners/ticket-updated-listener';


console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
    });

    new TicketUpdatedListener(stan).listen();
    new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());