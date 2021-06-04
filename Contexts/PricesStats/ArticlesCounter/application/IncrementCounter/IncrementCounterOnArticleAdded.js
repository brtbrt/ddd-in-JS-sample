// @flow

import type {DomainEventSubscriber} from "context-shared/domain/DomainEventSubscriber";
import type {ListenedDomainEventClass} from "context-shared/domain/ListenedDomainEvent";
import BackofficeArticleCreatedEvent from "../../domain/ListenedEvents/BackofficeArticleCreatedEvent";
import {ArticlesCounterIncrementer} from "./ArticlesCounterIncrementer";

export class IncrementCounterOnArticleAdded implements DomainEventSubscriber<BackofficeArticleCreatedEvent> {
    #articlesCounterIncrementer: ArticlesCounterIncrementer;

    constructor(articlesCounterIncrementer: ArticlesCounterIncrementer) {
        this.#articlesCounterIncrementer = articlesCounterIncrementer;
    }

    subscribedTo(): Array<ListenedDomainEventClass> {
        return [BackofficeArticleCreatedEvent];
    }

    async on(domainEvent: BackofficeArticleCreatedEvent): Promise<void> {
        this.#articlesCounterIncrementer.run();
        // todo continue here!!!! command bus for incrementing etc... :)
        const { aggregateId, name, upc } = domainEvent;


        console.log('received event> ' + aggregateId + '  ' + name + '   ' + upc);
        // todo continue here
        // return this.creator.run(aggregateId, duration, name);
        return Promise.resolve();
    }
}
