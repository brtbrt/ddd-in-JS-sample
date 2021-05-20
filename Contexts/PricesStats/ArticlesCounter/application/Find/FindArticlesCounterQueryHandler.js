// @flow

import type {Query} from "context-shared/domain/Query";
import type {QueryHandler} from "context-shared/domain/QueryHandler";
import {FindArticlesCounterQuery} from "./FindArticlesCounterQuery";
import {FindArticlesCounterResponse} from "./FindArticlesCounterResponse";

export class FindArticlesCounterQueryHandler implements QueryHandler<FindArticlesCounterQuery, FindArticlesCounterResponse> {
    // #finder: CoursesCounterFinder;

    // constructor(finder: CoursesCounterFinder) {
    constructor() {
    }

    subscribedTo(): Query {
        return FindArticlesCounterQuery;
    }

    handle(query: FindArticlesCounterQuery): Promise<FindArticlesCounterResponse> {
        // todo finder application service
        const response = new FindArticlesCounterResponse(6);
        return Promise.resolve(response);
        // return this.finder.run();
    }
}
