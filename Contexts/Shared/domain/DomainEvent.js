// @flow

import { Uuid } from './value-object/Uuid';

export class DomainEvent {
    #aggregateId: string;
    #eventId: string;
    #occurredOn: Date;
    #eventName: string;

    static get EVENT_NAME(): string {
        throw new Error('EVENT_NAME not implemented, use a parent');
    }

    get aggregateId (): string {
        return this.#aggregateId;
    }

    get eventId (): string {
        return this.#eventId;
    }

    get occurredOn (): Date {
        return this.#occurredOn;
    }

    get eventName (): string {
        return this.#eventName;
    }

    constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
        this.#aggregateId = aggregateId;
        this.#eventId = eventId || Uuid.random().value;
        this.#occurredOn = occurredOn || new Date();
        this.#eventName = eventName;
    }

    static fromPrimitives(...args: any[]): DomainEvent {
        throw new Error('not implemented, use a parent');
    };
}
