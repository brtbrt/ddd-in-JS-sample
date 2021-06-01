// @flow

import {DomainEvent} from "./DomainEvent";
import type {DomainEventInterface} from "./DomainEventInterface";

export interface EventBus {
    // setDomainEventMapping(domainEventMapping: DomainEventMapping): void;
    publish(events: Array<DomainEventInterface>): Promise<void>;
    // addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
    start(): Promise<void>;
}
