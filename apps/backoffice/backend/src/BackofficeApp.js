// @flow

import {Server} from "./Server";

export class BackofficeApp {
    #server: Server;

    async start(): Promise<void> {
        const port = '3001';
        console.log('listening to ' + port);
        this.#server = new Server(port);

        await this._registerSubscribers();

        return this.#server.listen();
    }

    async _registerSubscribers() {
        // todo
        // const eventBus: EventBus = (container.get('Shared.EventBus'): any);
        // const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
        // const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];
        //
        // subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
        // const domainEventMapping = new DomainEventMapping(subscribers);
        //
        // eventBus.setDomainEventMapping(domainEventMapping);
        // eventBus.addSubscribers(subscribers);
        // await eventBus.start();
    }
}