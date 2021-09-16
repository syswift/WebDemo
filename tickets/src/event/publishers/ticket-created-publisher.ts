import { Publisher, Subjects, TicketCreatedEvent } from '@syswift1/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
subject: Subjects.TicketCreated = Subjects.TicketCreated;
}