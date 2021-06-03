// @flow

export interface PublishableDomainEvent {
    +EVENT_NAME: string;
    toPrimitive(): Object;
}

