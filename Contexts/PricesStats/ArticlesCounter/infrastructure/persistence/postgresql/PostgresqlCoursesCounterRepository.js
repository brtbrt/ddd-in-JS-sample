// @flow

import type {ArticlesCounterRepository} from "../../../domain/ArticlesCounterRepository";
import type {Nullable} from "../../../../../Shared/domain/Nullable";
import ArticlesCounter from "../../../domain/ArticlesCounter";
import {ArticlesCounterId} from "../../../domain/ArticlesCounterId";
// todo continue here
import {Client} from 'pg';

export default class PostgresqlCoursesCounterRepository implements ArticlesCounterRepository {
    async search(): Promise<Nullable<ArticlesCounter>> {
        // todo continue here
        // const id = new ArticlesCounterId(ArticlesCounterId.random().toString());

        const client = new Client({
            user: 'root',
            host: 'db',
            database: 'prices_stats',
            password: 'example',
            port: 5432,
        });
        await client.connect();
        const res = await client.query('SELECT * FROM articles_counter');
        console.log(res.rows[0]); // Hello world!

        const document = {id: ArticlesCounterId.random().toString(), total: res.rows[0].total};
        return Promise.resolve(document ? ArticlesCounter.fromPrimitives({ ...document, id: document.id }) : null);
    }
}