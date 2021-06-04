// @flow

import {DomainEvent} from "context-shared/domain/DomainEvent";
import type {DomainEventInterface} from "context-shared/domain/DomainEventInterface";
import type {PublishableDomainEvent} from "context-shared/domain/PublishableDomainEvent";

type ArticlesCounterIncrementedDomainEventBody = $ReadOnly<{
    total: number;
    eventName: string;
    id: string;
}>;

export class ArticlesCounterIncrementedDomainEvent extends DomainEvent implements DomainEventInterface, PublishableDomainEvent {
    #total: number;

    static get EVENT_NAME(): string {
        return 'pricesStats.ArticlesCounter.incremented';
    };

    get EVENT_NAME(): string {
        return ArticlesCounterIncrementedDomainEvent.EVENT_NAME;
    };

    get total(): number {
        return this.#total;
    }

    constructor({
                    id,
                    total,
                    eventId,
                    occurredOn
                }: {
        id: string;
        total: number;
        eventId?: string;
        occurredOn?: Date;
    }) {
        super(ArticlesCounterIncrementedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
        this.#total = total;
    }

    toPrimitive(): ArticlesCounterIncrementedDomainEventBody {
        return {
            total: this.#total,
            eventName: ArticlesCounterIncrementedDomainEvent.EVENT_NAME,
            id: this.aggregateId
        };
    }

}
