// @flow

import {DomainEvent} from "./DomainEvent";

export interface EventBus {
    // setDomainEventMapping(domainEventMapping: DomainEventMapping): void;
    publish(events: Array<DomainEvent>): Promise<void>;
    // addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
    start(): Promise<void>;
}
