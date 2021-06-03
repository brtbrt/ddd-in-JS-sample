// @flow

export interface DomainEventInterface {
    +aggregateId: string;
    +eventId: string;
    +occurredOn: Date;
    +eventName: string;
}

