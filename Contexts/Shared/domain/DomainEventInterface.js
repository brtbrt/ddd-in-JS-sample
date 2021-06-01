// @flow

export interface DomainEventInterface {
    +EVENT_NAME: string;
    +aggregateId: string;
    +eventId: string;
    +occurredOn: Date;
    +eventName: string;

    toPrimitive(): Object;
}

