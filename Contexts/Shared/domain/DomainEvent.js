// @flow

import { Uuid } from './value-object/Uuid';

export class DomainEvent {
    static EVENT_NAME: string;
    // static fromPrimitives: (...args: any[]) => any;
    #aggregateId: string;
    #eventId: string;
    #occurredOn: Date;
    #eventName: string;

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

    // abstract toPrimitive(): Object;
}
