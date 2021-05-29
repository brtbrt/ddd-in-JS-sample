// @flow

import {DomainEvent} from "context-shared/domain/DomainEvent";

type BackofficeArticleCreatedDomainEventBody = $ReadOnly<{
    name: string;
    upc: string;
    eventName: string;
    id: string;
}>;

export class BackofficeArticleCreatedDomainEvent extends DomainEvent {
    #name: string;
    #upc: string;

    static get EVENT_NAME(): string {
        return 'course.created';
    }

    constructor({
                    id,
                    name,
                    upc,
                    eventId,
                    occurredOn
                }: {
        id: string;
        eventId?: string;
        name: string;
        upc: string;
        occurredOn?: Date;
    }) {
        super(BackofficeArticleCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
        this.#name = name;
        console.log('new domain event 3!');
        this.#upc = upc;
        console.log('new domain event 4!');
    }

    toPrimitive(): BackofficeArticleCreatedDomainEventBody {
        return {
            name: this.#name,
            upc: this.#upc,
            eventName: BackofficeArticleCreatedDomainEvent.EVENT_NAME,
            id: this.aggregateId
        };
    }

    static fromPrimitives(
        aggregateId: string,
        body: BackofficeArticleCreatedDomainEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new BackofficeArticleCreatedDomainEvent({
            id: aggregateId,
            name: body.name,
            upc: body.upc,
            eventId,
            occurredOn
        });
    }
}
