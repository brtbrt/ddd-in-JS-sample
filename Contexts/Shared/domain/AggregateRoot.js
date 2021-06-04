// @flow

import { DomainEvent } from './DomainEvent';
import type {PublishableDomainEvent} from "./PublishableDomainEvent";
import type {DomainEventInterface} from "./DomainEventInterface";


export interface AggregateRoot {
    pullDomainEvents(): Array<PublishableDomainEvent & DomainEventInterface>;
    record(event: PublishableDomainEvent & DomainEventInterface): void;
    toPrimitives(): any;
}

export class AggregateEvents {
    #domainEvents: Array<PublishableDomainEvent & DomainEventInterface>;

    constructor(aggregateRoot: any) {
        this.#domainEvents = [];
    }

    pullDomainEvents(): Array<PublishableDomainEvent & DomainEventInterface> {
        const domainEvents = this.#domainEvents.slice();
        this.#domainEvents = [];

        return domainEvents;
    }

    record(event: PublishableDomainEvent & DomainEventInterface): void {
        this.#domainEvents.push(event);
    }
}