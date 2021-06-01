// @flow

import {DomainEvent} from "context-shared/domain/DomainEvent";
import type {DomainEventInterface} from "context-shared/domain/DomainEventInterface";

type BackofficeArticleCreatedDomainEventBody = $ReadOnly<{
    name: string;
    upc: string;
    eventName: string;
    id: string;
}>;

export class BackofficeArticleCreatedDomainEvent extends DomainEvent implements DomainEventInterface {
    #name: string;
    #upc: string;

    static get EVENT_NAME(): string {
        return 'course.created';
    };

    get EVENT_NAME(): string {
        return BackofficeArticleCreatedDomainEvent.EVENT_NAME;
    };

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
        this.#upc = upc;
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
        ...args: any[]
    ): BackofficeArticleCreatedDomainEvent {
        const [
            aggregateId: string,
            body: BackofficeArticleCreatedDomainEventBody,
            eventId: string,
            occurredOn: Date] = args;

        return new BackofficeArticleCreatedDomainEvent({
            id: aggregateId,
            name: body.name,
            upc: body.upc,
            eventId,
            occurredOn
        });
    }

    static fromPrimitives(aggregateId: string, body: BackofficeArticleCreatedDomainEventBody, eventId: string, occurredOn: Date): BackofficeArticleCreatedDomainEvent {
        return BackofficeArticleCreatedDomainEvent.fromPrimitives(aggregateId, body, eventId, occurredOn);
    }
}
