// @flow

import {Server} from "./Server";
import RabbitMqEventBus from "context-shared/infrastructure/EventBus/RabbitMq/RabbitMqEventBus";
import type {EventBus} from "context-shared/domain/EventBus";
import container from "./services";

export class BackofficeApp {
    #server: Server;

    async start(): Promise<void> {
        const port = '3001';
        console.log('listening to ' + port);

        await this._setupEventBus();
        this.#server = new Server(port);

        return this.#server.listen();
    }

    async _setupEventBus() {
        const subscribers = [];
        const taggedServices = container.findTaggedServiceIds('domainEventSubscriber');
        for (const definition of taggedServices.values()) {
            for (const tag of definition.tags) {
                console.log(taggedServices.get());
                subscribers.push(container.instanceManager.getInstanceFromDefinition(definition));
            }
        }

        container.set('Shared.EventBus', new RabbitMqEventBus(container.get('Backoffice.articles.RabbitMqConfig'), container.get('Shared.DomainEventJsonDeserializer'), subscribers));

        const eventBus: EventBus = (container.get('Shared.EventBus'): any);
        await eventBus.start();
    }
}