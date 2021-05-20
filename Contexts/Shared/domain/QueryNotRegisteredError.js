// @flow
import { Query } from './Query';

export class QueryNotRegisteredError extends Error {
    constructor(query: Query) {
        super(`No query handler associated to the query: <${query.constructor.name}>`);
    }
}
