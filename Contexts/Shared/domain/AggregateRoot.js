// @flow

import { DomainEvent } from './DomainEvent';


export interface AggregateRoot {
    pullDomainEvents(): Array<DomainEvent>;
    record(event: DomainEvent): void;
    toPrimitives(): any;
}

export class AggregateEvents {
    #domainEvents: Array<DomainEvent>;

    constructor(aggregateRoot: any) {
        this.#domainEvents = [];
    }

    pullDomainEvents(): Array<DomainEvent> {
        const domainEvents = this.#domainEvents.slice();
        this.#domainEvents = [];

        return domainEvents;
    }

    record(event: DomainEvent): void {
        this.#domainEvents.push(event);
    }
}