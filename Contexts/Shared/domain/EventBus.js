// @flow

import type {DomainEventInterface} from "./DomainEventInterface";
import type {PublishableDomainEvent} from "./PublishableDomainEvent";

export interface EventBus {
    publish(events: Array<PublishableDomainEvent & DomainEventInterface>): Promise<void>;
    // addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
    start(): Promise<void>;
}
