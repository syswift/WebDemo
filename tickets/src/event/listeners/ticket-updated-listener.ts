import {Listener,TicketUpdatedEvent,Subjects} from '@syswift1/common';
import {Message} from 'node-nats-streaming';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        console.log('Event data!', data);

        msg.ack();
    }
}