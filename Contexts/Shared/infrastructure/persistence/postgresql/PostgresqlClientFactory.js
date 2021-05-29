// @flow

import type {PostgresConfig} from "./PostgresConfig";
import {Client} from 'pg';

export default class PostgresqlClientFactory {
    static #clients: Map<string, Client> = new Map();

    static async createClient(contextName: string, config: PostgresConfig): Promise<Client> {
        if (!PostgresqlClientFactory.#clients.has(contextName)) {
            const client = await PostgresqlClientFactory._createAndConnectClient(config);
            PostgresqlClientFactory._registerClient(client, contextName);
            return client;
        }

        return (PostgresqlClientFactory.#clients.get(contextName): any);
    }

    static _registerClient(client: Client, contextName: string): void {
        PostgresqlClientFactory.#clients.set(contextName, client);
    }

    static async _createAndConnectClient(config: PostgresConfig): Promise<Client> {
        const client = new Client(config);
        try{
            await client.connect();
        } catch(e) {
            console.log(e);
        }
        return client;
    }
}