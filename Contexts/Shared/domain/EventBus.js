// @flow

import {DomainEvent} from "./DomainEvent";
import type {DomainEventInterface} from "./DomainEventInterface";
import type {PublishableDomainEvent} from "./PublishableDomainEvent";
import {DomainEventMapping} from "../infrastructure/EventBus/RabbitMq/DomainEventMapping";

export interface EventBus {
    setDomainEventMapping(domainEventMapping: DomainEventMapping): void;
    publish(events: Array<PublishableDomainEvent & DomainEventInterface>): Promise<void>;
    // addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
    start(): Promise<void>;
}
