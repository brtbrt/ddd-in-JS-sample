// @flow

import type {DomainEventSubscriber} from "context-shared/domain/DomainEventSubscriber";
import type {ListenedDomainEvent, ListenedDomainEventClass} from "context-shared/domain/ListenedDomainEvent";
import BackofficeArticleCreatedEvent from "../../domain/ListenedEvents/BackofficeArticleCreatedEvent";

export class IncrementCounterOnArticleAdded implements DomainEventSubscriber<BackofficeArticleCreatedEvent> {
    constructor() {
        console.log('increment counter on article added constructor');
    }

    subscribedTo(): Array<ListenedDomainEventClass> {
        return [BackofficeArticleCreatedEvent];
    }

    async on(domainEvent: BackofficeArticleCreatedEvent): Promise<void> {
        // todo continue here :)
        const { aggregateId, name, upc } = domainEvent;
        
        console.log('received event> ' + aggregateId + '  ' + name + '   ' + upc);
        // todo continue here
        // return this.creator.run(aggregateId, duration, name);
        return Promise.resolve();
    }
}
