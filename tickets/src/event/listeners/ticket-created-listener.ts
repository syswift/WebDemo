import {Listener,TicketCreatedEvent,Subjects} from '@syswift1/common';
import {Message} from 'node-nats-streaming';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data);

        msg.ack();
    }
}