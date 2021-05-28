// @flow

import convict from 'convict';

const priceStatsConfig: any = convict({
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
            default: 'prices_stats'
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
});

priceStatsConfig.loadFile([`${__dirname}/../../../../../config/Contexts/PricesStats/default.json` ,`${__dirname}/../../../../../config/Contexts/PricesStats/${priceStatsConfig.get('env')}.json`]);

export default priceStatsConfig;
