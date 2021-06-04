// @flow

import type {ArticlesCounterRepository} from "../../../domain/ArticlesCounterRepository";
import type {Nullable} from "context-shared/domain/Nullable";
import ArticlesCounter from "../../../domain/ArticlesCounter";
import {Client} from 'pg';

export default class PostgresqlArticlesCounterRepository implements ArticlesCounterRepository {
    #client: Promise<Client>;

    constructor(client: Promise<Client>) {
        this.#client = client;
    }

    async search(): Promise<Nullable<ArticlesCounter>> {
        const res = await (await this.#client).query('SELECT * FROM articles_counter');

        if (res.rowCount === 0) {
            return Promise.resolve(null);
        }

        const document = {id: res.rows[0].id, total: res.rows[0].total};
        return Promise.resolve(document ? ArticlesCounter.fromPrimitives({ ...document, id: document.id }) : null);
    }

    async save(articlesCounter: ArticlesCounter): Promise<void> {
        const {id, total} = articlesCounter.toPrimitives();

        await (await this.#client).query('INSERT INTO articles_counter VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET total = $2', [id, total]);

        return Promise.resolve();
    }
}
