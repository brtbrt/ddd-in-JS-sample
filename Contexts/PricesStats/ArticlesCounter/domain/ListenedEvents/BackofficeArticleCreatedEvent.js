// @flow

import type {ListenedDomainEvent} from "context-shared/domain/ListenedDomainEvent";
import {DomainEvent} from "context-shared/domain/DomainEvent";
import type {DomainEventInterface} from "context-shared/domain/DomainEventInterface";
import {ArticlesCounterId} from "../ArticlesCounterId";
import ArticlesCounterTotal from "../ArticlesCounterTotal";
import {ListenedDomainEventName} from "context-shared/domain/ListenedDomainEvent";

type BackofficeArticleCreatedDomainEventBody = $ReadOnly<{
    name: string;
    upc: string;
    eventName: string;
    id: string;
}>;

export default class BackofficeArticleCreatedEvent extends DomainEvent implements ListenedDomainEvent {
    #name: string;
    #upc: string;

    static get EVENT_NAME(): string {
        return 'backoffice.course.created';
    }

    get EVENT_NAME(): string {
        return 'backoffice.course.created';
    }

    get name():string {
        return this.#name;
    }

    get upc():string {
        return this.#upc;
    }

    constructor({
                    aggregateId,
                    name,
                    upc,
                    eventId,
                    occurredOn
                }: {
        aggregateId: string;
        eventId?: string;
        name: string;
        upc: string;
        occurredOn?: Date;
    }) {
        super(BackofficeArticleCreatedEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
        this.#name = name;
        this.#upc = upc;
    }


    static fromPrimitives(aggregateId: string, body: BackofficeArticleCreatedDomainEventBody, eventId: string, occurredOn: Date): BackofficeArticleCreatedEvent {
        return new BackofficeArticleCreatedEvent({
            aggregateId,
            name: body.name,
            upc: body.upc,
            eventId,
            occurredOn
        });

    }
}