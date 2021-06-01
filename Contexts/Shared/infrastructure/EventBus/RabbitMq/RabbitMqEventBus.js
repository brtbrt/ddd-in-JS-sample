// @flow

import {DomainEvent} from "../../../domain/DomainEvent";
import { Connection, Channel, Message, connect } from 'amqplib';
import type {EventBus} from "../../../domain/EventBus";
import type {RabbitMqConfig} from "./RabbitMqConfig";
import type {DomainEventInterface} from "../../../domain/DomainEventInterface";

export default class RabbitMqEventBus implements EventBus {
    #connection: Promise<Connection>;
    #channel: Promise<Channel>;
    #exchange: Promise<ExchangeOk>;

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
    }

    async start(): Promise<void>{
        return Promise.resolve();
    }
    
    async publish(events: Array<DomainEventInterface>): Promise<void> {
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