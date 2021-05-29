// @flow

import { Uuid } from './value-object/Uuid';


export class DomainEvent {
    // static fromPrimitives: (...args: any[]) => any;
    #aggregateId: string;
    #eventId: string;
    #occurredOn: Date;
    #eventName: string;

    static get EVENT_NAME(): string {
        throw new Error('not implemented');
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

    // abstract toPrimitive(): Object;
}
