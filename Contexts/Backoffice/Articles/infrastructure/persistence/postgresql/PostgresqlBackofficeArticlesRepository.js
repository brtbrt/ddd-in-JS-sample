// @flow

import {Client} from 'pg';
import type {BackofficeArticleRepository} from "../../../domain/BackofficeArticleRepository";
import BackofficeArticle from "../../../domain/BackofficeArticle";
import {BackofficeArticleId} from "../../../domain/BackofficeArticleId";
import type {Nullable} from "context-shared/domain/Nullable";

export default class PostgresqlBackofficeArticlesRepository implements BackofficeArticleRepository {
    #client: Promise<Client>;

    static get QUERY_INSERT(): string {
        return 'INSERT INTO articles(id, name, upc) VALUES($1, $2, $3)';
    }

    static get QUERY_GET_BY_ID(): string {
        return 'SELECT * FROM articles WHERE id = $1';
    }

    constructor(client: Promise<Client>) {
        this.#client = client;
    }

    async save(article: BackofficeArticle): Promise<void> {
        const values = [article.id.toString(), article.name.toString(), article.upc.toString()];

        try {
            await (await this.#client).query(PostgresqlBackofficeArticlesRepository.QUERY_INSERT, values);
        } catch (err) {
            console.log(err.stack)
        }

        return Promise.resolve();
    }

    async getByBackofficeArticleId(id: BackofficeArticleId): Promise<Nullable<BackofficeArticle>> {
        const values = [id.toString()]

        try {
            const result = await (await this.#client).query(PostgresqlBackofficeArticlesRepository.QUERY_GET_BY_ID, values);
            if (result.rowCount > 0) {
                return Promise.resolve(BackofficeArticle.fromPrimitives(result.rows[0]));
            }
        } catch (err) {
            console.log(err.stack)
        }


        return Promise.resolve(null);
    }
}
