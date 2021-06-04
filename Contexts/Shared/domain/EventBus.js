// @flow

import type {DomainEventInterface} from "./DomainEventInterface";
import type {PublishableDomainEvent} from "./PublishableDomainEvent";
import type {DomainEventSubscriber} from "./DomainEventSubscriber";
import type {ListenedDomainEvent} from "./ListenedDomainEvent";

export interface EventBus {
    publish(events: Array<PublishableDomainEvent & DomainEventInterface>): Promise<void>;
    start(): Promise<void>;
}
