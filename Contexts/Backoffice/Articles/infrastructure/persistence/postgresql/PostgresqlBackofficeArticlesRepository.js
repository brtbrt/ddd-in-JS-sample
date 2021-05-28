// @flow

import {Client} from 'pg';
import type {BackofficeArticleRepository} from "../../../domain/BackofficeArticleRepository";
import BackofficeArticle from "../../../domain/BackofficeArticle";

export default class PostgresqlBackofficeArticlesRepository implements BackofficeArticleRepository {
    #client: Promise<Client>;

    static get QUERY(): string {
        return 'INSERT INTO articles(id, name, upc) VALUES($1, $2, $3)';
    }

    constructor(client: Promise<Client>) {
        this.#client = client;
    }

    async save(article: BackofficeArticle): Promise<void> {
        const values = [article.id.toString(), article.name.toString(), article.upc.toString()];

        try {
            await (await this.#client).query(PostgresqlBackofficeArticlesRepository.QUERY, values);
        } catch (err) {
            console.log(err.stack)
        }

        return Promise.resolve();
    }
}
