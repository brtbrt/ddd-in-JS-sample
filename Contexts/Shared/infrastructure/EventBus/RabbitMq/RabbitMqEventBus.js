// @flow

import { Connection, Channel, connect } from 'amqplib';
import type {EventBus} from "../../../domain/EventBus";
import type {RabbitMqConfig} from "./RabbitMqConfig";
import type {DomainEventInterface} from "../../../domain/DomainEventInterface";
import {DomainEventJsonDeserializer} from "./DomainEventJsonDeserializer";
import {DomainEventMapping} from "./DomainEventMapping";
import {IncrementCounterOnArticleAdded} from "context-prices-stats/ArticlesCounter/application/IncrementCounter/IncrementCounterOnArticleAdded";
import type {DomainEventSubscriber} from "../../../domain/DomainEventSubscriber";
import type {PublishableDomainEvent} from "../../../domain/PublishableDomainEvent";
import type {ListenedDomainEvent, ListenedDomainEventClass} from "../../../domain/ListenedDomainEvent";

export default class RabbitMqEventBus implements EventBus {
    #connection: Promise<Connection>;
    #channel: Promise<Channel>;
    #exchange: Promise<ExchangeOk>;
    #deserializer: ?DomainEventJsonDeserializer;
    #subscribers: Map<string, DomainEventSubscriber<ListenedDomainEvent>>;

    constructor(config: RabbitMqConfig) {
        this.#connection = connect(`amqp://${config.user}:${config.password}@${config.host}`);
        this.#connection.then((connection: Connection) => {
            connection.createChannel().then((channel: Channel) => {
                this.#channel = Promise.resolve(channel);
                this.#exchange = channel.assertExchange(config.exchange, 'fanout', {durable: false})
            });
        }).catch((err) => {
            console.log('error ', err);
        });

        const subscriber = new IncrementCounterOnArticleAdded();
        this.#subscribers = new Map();

        subscriber.subscribedTo().forEach((subscribedTo: ListenedDomainEventClass) => {
            this.#subscribers.set(subscribedTo.EVENT_NAME, subscriber);
        });
    }

    async start(): Promise<void> {
        // todo continue here
        // const a: DomainEventSubscriber<DomainEventInterface> = (new IncrementCounterOnArticleAdded(): any);

        return Promise.resolve();
    }

    setDomainEventMapping(domainEventMapping: DomainEventMapping): void {
        this.#deserializer = new DomainEventJsonDeserializer(domainEventMapping);
        // todo continue here
        const event = this.#deserializer.deserialize('{"data":{"attributes": {"id": "aaa", "name": "nome", "upc": "upc-code"}, "ocurred_on": "12 April 2021", "type": "backoffice.course.created"}}');
        console.log(event?.aggregateId);
        if (!event)
            return;

        this.#subscribers.get(event.eventName)?.on(event);
    }
    
    async publish(events: Array<PublishableDomainEvent & DomainEventInterface>): Promise<void> {
        const channel = await this.#channel
        const {exchange} = await this.#exchange;

        events.map(event => {
            const message = {
                data: {
                    type: event.eventName,
                    occurred_on: event.occurredOn,
                    id: event.eventId,
                    attributes: event.toPrimitive()
                },
                meta: {}
            };

            channel.publish(exchange, '', Buffer.from(message.toString()));
        });
    }

}