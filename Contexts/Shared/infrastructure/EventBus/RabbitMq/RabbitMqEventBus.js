// @flow

import { Connection, Channel, connect } from 'amqplib';
import type {EventBus} from "../../../domain/EventBus";
import type {RabbitMqConfig} from "./RabbitMqConfig";
import type {DomainEventInterface} from "../../../domain/DomainEventInterface";
import {DomainEventJsonDeserializer} from "./DomainEventJsonDeserializer";
import type {DomainEventSubscriber} from "../../../domain/DomainEventSubscriber";
import type {PublishableDomainEvent} from "../../../domain/PublishableDomainEvent";
import type {ListenedDomainEvent, ListenedDomainEventClass} from "../../../domain/ListenedDomainEvent";

export default class RabbitMqEventBus implements EventBus {
    #connection: Promise<Connection>;
    #channel: Promise<Channel>;
    #exchange: Promise<ExchangeOk>;
    #deserializer: DomainEventJsonDeserializer;
    #subscribers: Map<string, Array<DomainEventSubscriber<ListenedDomainEvent>>>;
    #config: RabbitMqConfig;

    constructor(config: RabbitMqConfig, domainEventJsonDeserializer: DomainEventJsonDeserializer, subscribers: Array<DomainEventSubscriber<ListenedDomainEvent>>) {
        this.#connection = connect(`amqp://${config.user}:${config.password}@${config.host}`);
console.log(config);
        this.#channel = new Promise(async (resolve, reject) => {
                const conn = await this.#connection;
                const channel = await conn.createChannel();
                await channel.assertExchange(config.exchange, 'fanout', {durable: false});

                resolve(channel);
            }
        );
// todo log reject

        this.#deserializer = domainEventJsonDeserializer;
        this.#subscribers = this._mapSubscribers(subscribers);
        this.#config = config;
    }

    async start(): Promise<void> {
        const channel: Channel = await this.#channel;
        // const {exchange} = await this.#exchange;
        console.log('-----');
        // todo continue here
        const queue = await channel.assertQueue('', {exclusive: true});


        await channel.bindQueue(queue.queue, this.#config.exchange, '');
        await channel.consume(queue.queue, async (message) => {
                    if (!message) {
                        return;
                    }

                    const event = this.#deserializer.deserialize(message.content.toString());
            console.log('event:');
                    console.log(event);

                    if (event) {
                        const subscribers = this.#subscribers.get(event.eventName);

console.log(subscribers);
                        if (subscribers && subscribers.length) {
                            const subscribersNames = subscribers.map((subscriber: DomainEventSubscriber<ListenedDomainEvent>) => subscriber.constructor.name);

                            console.log(`[RabbitMqEventBus] Message processed: ${event.eventName} by ${subscribersNames.toString()}`);

                            const subscribersExecutions = subscribers.map(subscriber => subscriber.on(event));
                            await Promise.all(subscribersExecutions);
                        }
                    }
                    // await channel.ack(message);
        }, {noAck: true})

        console.log('-----');

        return Promise.resolve();
    }

    _mapSubscribers(subscribers: Array<DomainEventSubscriber<ListenedDomainEvent>>) :Map<string, Array<DomainEventSubscriber<ListenedDomainEvent>>> {
        const newSubscribers = new Map();

        subscribers?.forEach((subscriber) => {
            subscriber.subscribedTo().forEach((subscribedTo: ListenedDomainEventClass) => {
                const newAddedSubscribers = newSubscribers.get(subscribedTo.EVENT_NAME) ?? [];
                newAddedSubscribers.push(subscriber)
                newSubscribers.set(subscribedTo.EVENT_NAME, newAddedSubscribers);
            });
        });
        
        return newSubscribers;
    }
    
    async publish(events: Array<PublishableDomainEvent & DomainEventInterface>): Promise<void> {
        const channel = await this.#channel

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

            channel.publish(this.#config.exchange, '', Buffer.from(JSON.stringify(message)));
        });
    }

}