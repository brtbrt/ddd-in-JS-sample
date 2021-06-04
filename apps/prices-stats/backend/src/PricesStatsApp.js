// @flow
import { Server } from './Server';
import container from './services';
import type {EventBus} from "context-shared/domain/EventBus";
import {DomainEventMapping} from "context-shared/infrastructure/EventBus/RabbitMq/DomainEventMapping";
import {IncrementCounterOnArticleAdded} from "context-prices-stats/ArticlesCounter/application/IncrementCounter/IncrementCounterOnArticleAdded";
import * as Domain from "domain";
import RabbitMqEventBus from "context-shared/infrastructure/EventBus/RabbitMq/RabbitMqEventBus";

export class PricesStatsApp {
  #server: Server;

  async start(): Promise<void> {
    const port = '3000';
    console.log('listening to ' + port);
    this.#server = new Server(port);

    await this._registerSubscribers();

    return this.#server.listen();
  }

  //
  // async stop() {
  //     return this.server?.stop();
  // }
  //
  // get httpServer() {
  //     return this.server?.getHTTPServer();
  // }

  async _registerSubscribers() {
    const subscribers = [];
    const taggedServices = container.findTaggedServiceIds('domainEventSubscriber');
    for (const definition of taggedServices.values()) {
      for (const tag of definition.tags) {
        console.log(taggedServices.get());
        subscribers.push(container.instanceManager.getInstanceFromDefinition(definition));
      }
    }

    container.set('Shared.EventBus', new RabbitMqEventBus(container.get('PricesStats.articlesCounter.RabbitMqConfig'), container.get('Shared.DomainEventJsonDeserializer'), subscribers));

    const eventBus: EventBus = (container.get('Shared.EventBus'): any);
    await eventBus.start();

    const domainEventMapping: DomainEventMapping = (container.get('Shared.DomainEventMapping'): any);

    // eventBus.setDomainEventMapping(domainEventMapping);
    //todo continue here

    // const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
    // const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];
    //
    // subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
    // const domainEventMapping = new DomainEventMapping(subscribers);
    //
    // eventBus.setDomainEventMapping(domainEventMapping);
    // eventBus.addSubscribers(subscribers);
  }
}
