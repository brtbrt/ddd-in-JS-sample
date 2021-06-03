// @flow

import convict from 'convict';

const articlesCounterConfig: any = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'staging', 'test'],
        default: 'default',
        env: 'NODE_ENV'
    },
    postgres: {
        user: {
            doc: 'DB user',
            format: String,
            env: 'POSTGRES_USER',
            default: 'root'
        },
        host: {
            doc: 'DB host address',
            format: String,
            env: 'POSTGRES_HOST',
            default: 'db'
        },
        database: {
            doc: 'DB database',
            format: String,
            env: 'POSTGRES_DATABASE',
            default: 'articles_counter'
        },
        password: {
            doc: 'DB password',
            format: String,
            env: 'POSTGRES_PASSWORD',
            default: 'example'
        },
        port: {
            doc: 'DB port',
            format: Number,
            env: 'POSTGRES_PORT',
            default: 5432
        },
    },
    rabbitMQ: {
        host: {
            doc: 'The RabbitMQ connection host',
            format: String,
            env: 'RABBITMQ_HOST',
            default: 'rabbitmq'
        },
        user: {
            doc: 'The RabbitMQ connection user',
            format: String,
            env: 'RABBITMQ_DEFAULT_USER',
            default: 'guest'
        },
        password: {
            doc: 'The RabbitMQ connection password',
            format: String,
            env: 'RABBITMQ_DEFAULT_PASS',
            default: 'guest'
        },
        queue: {
            doc: 'Queue where subscribers listen on',
            format: String,
            env: 'RABBITMQ_QUEUE',
            default: 'BackofficeArticles-DomainEvents'
        },
        exchange: {
            doc: 'Exchange where events are published',
            format: String,
            env: 'RABBITMQ_EXCHANGE',
            default: 'DomainEvents'
        }
    }
});

articlesCounterConfig.loadFile([`${__dirname}/../../../../../config/Contexts/PricesStats/default.json` ,`${__dirname}/../../../../../config/Contexts/PricesStats/${articlesCounterConfig.get('env')}.json`]);

export default articlesCounterConfig;
