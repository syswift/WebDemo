import { Publisher, Subjects, TicketUpdatedEvent } from '@syswift1/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}