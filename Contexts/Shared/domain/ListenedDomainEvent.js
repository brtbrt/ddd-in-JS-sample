// @flow

import type {DomainEventInterface} from "./DomainEventInterface";

export interface ListenedDomainEventName {
    +EVENT_NAME: string;
}

export type ListenedDomainEvent = ListenedDomainEventName & DomainEventInterface;
export type ListenedDomainEventClass = ListenedDomainEventName & { fromPrimitives(...args: any[]): DomainEventInterface; };