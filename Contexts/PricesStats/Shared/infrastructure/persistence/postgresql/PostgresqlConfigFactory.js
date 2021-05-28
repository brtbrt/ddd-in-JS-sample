// @flow

import type {PostgresConfig} from "context-shared/infrastructure/persistence/postgresql/PostgresConfig";
import config from "../../config"

export default class PostgresqlConfigFactory {
    static createConfig(): PostgresConfig {
        return {
            user: config.get('postgres.user'),
            host: config.get('postgres.host'),
            database: config.get('postgres.database'),
            password: config.get('postgres.password'),
            port: config.get('postgres.port')
        };
    }
}