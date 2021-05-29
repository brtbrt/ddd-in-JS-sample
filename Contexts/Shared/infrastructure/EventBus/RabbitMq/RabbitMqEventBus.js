// @flow

import type {EventBus} from "../../../domain/EventBus";
import {DomainEvent} from "../../../domain/DomainEvent";

export default class RabbitMqEventBus implements EventBus {

    publish(events: Array<DomainEvent>): Promise<void> {
        // todo continue here :)
        return Promise.resolve();
    }

    start(): Promise<void>{
        return Promise.resolve();
    }
}