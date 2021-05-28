// @flow

import type {Query} from "context-shared/domain/Query";
import type {QueryHandler} from "context-shared/domain/QueryHandler";
import {FindArticlesCounterQuery} from "./FindArticlesCounterQuery";
import {FindArticlesCounterResponse} from "./FindArticlesCounterResponse";
import {ArticlesCounterFinder} from "./ArticlesCounterFinder";

export class FindArticlesCounterQueryHandler implements QueryHandler<FindArticlesCounterQuery, FindArticlesCounterResponse> {
    #finder: ArticlesCounterFinder;

    constructor(finder: ArticlesCounterFinder) {
        this.#finder = finder;
    }

    subscribedTo(): Query {
        return FindArticlesCounterQuery;
    }

    handle(query: FindArticlesCounterQuery): Promise<FindArticlesCounterResponse> {
        return this.#finder.run();
    }
}
