// @flow

import type {ArticlesCounterRepository} from "../../../domain/ArticlesCounterRepository";
import type {Nullable} from "context-shared/domain/Nullable";
import ArticlesCounter from "../../../domain/ArticlesCounter";
import {ArticlesCounterId} from "../../../domain/ArticlesCounterId";
import {Client} from 'pg';

export default class PostgresqlArticlesCounterRepository implements ArticlesCounterRepository {
    #client: Promise<Client>;

    constructor(client: Promise<Client>) {
        this.#client = client;
    }

    async search(): Promise<Nullable<ArticlesCounter>> {
        const res = await (await this.#client).query('SELECT * FROM articles_counter');
        const document = {id: ArticlesCounterId.random().toString(), total: res.rows[0].total};
        return Promise.resolve(document ? ArticlesCounter.fromPrimitives({ ...document, id: document.id }) : null);
    }
}
