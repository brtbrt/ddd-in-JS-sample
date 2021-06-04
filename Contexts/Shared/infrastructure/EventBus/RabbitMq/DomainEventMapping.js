// @flow

import type {DomainEventSubscriber} from "../../../domain/DomainEventSubscriber";
import type {ListenedDomainEventClass} from "../../../domain/ListenedDomainEvent";
import type {ListenedDomainEvent} from "../../../domain/ListenedDomainEvent";

export class DomainEventMapping {
    #mapping: Map<string, ListenedDomainEventClass>;

    constructor<I: ListenedDomainEvent>(mapping: Array<DomainEventSubscriber<I>>) {
        this.#mapping = mapping.reduce(this._eventsExtractor(), new Map<string, ListenedDomainEventClass>());
    }

    for(eventName: string): ?ListenedDomainEventClass {
        const domainEvent = this.#mapping.get(eventName);

        if (!domainEvent) {
            return;
        }

        return domainEvent;
    }

    _eventsExtractor<I: ListenedDomainEvent>(): (map: Map<string, ListenedDomainEventClass>, subscriber: DomainEventSubscriber<I>) => Map<string, ListenedDomainEventClass> {
        return (map, subscriber) => {
            subscriber.subscribedTo().forEach((domainEvent: ListenedDomainEventClass) => {
                const eventName = domainEvent.EVENT_NAME;
                map.set(eventName, domainEvent);
            });
            return map;
        };
    }
}