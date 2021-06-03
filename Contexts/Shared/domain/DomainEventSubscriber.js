// @flow

import type {ListenedDomainEvent} from "./ListenedDomainEvent";
import type {ListenedDomainEventClass} from "./ListenedDomainEvent";
import type {DomainEventInterface} from "./DomainEventInterface";
import {ListenedDomainEventName} from "./ListenedDomainEvent";

export interface DomainEventSubscriber<+T: ListenedDomainEvent> {
    subscribedTo(): Array<ListenedDomainEventClass>;

    on(domainEvent: T): Promise<void>;
}
