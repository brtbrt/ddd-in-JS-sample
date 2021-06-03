// @flow

import type {RabbitMqConfig} from "context-shared/infrastructure/EventBus/RabbitMq/RabbitMqConfig";
import config from "../../config"

export class RabbitMqConfigFactory {
    static createConfig(): RabbitMqConfig {
        return {
            host: config.get('rabbitMQ.host'),
            user: config.get('rabbitMQ.user'),
            password: config.get('rabbitMQ.password'),
            queue: config.get('rabbitMQ.queue'),
            exchange: config.get('rabbitMQ.exchange')
        };
    }
}
