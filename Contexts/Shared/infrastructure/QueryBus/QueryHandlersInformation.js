// @flow

import {QueryNotRegisteredError} from "../../domain/QueryNotRegisteredError";

import type {Query} from "../../domain/Query";
import type {QueryHandler} from "../../domain/QueryHandler";


export class QueryHandlersInformation {
    #queryHandlersMap: Map<Query, QueryHandler<Query, Response>>;

    constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
        this.#queryHandlersMap = this._formatHandlers(queryHandlers);
    }

    search(query: Query): QueryHandler<Query, Response> {
        const queryHandler = this.#queryHandlersMap.get(query.constructor);

        if (!queryHandler) {
            throw new QueryNotRegisteredError(query);
        }

        return queryHandler;
    }

    _formatHandlers(
        queryHandlers: Array<QueryHandler<Query, Response>>
    ): Map<Query, QueryHandler<Query, Response>> {
        const handlersMap = new Map();

        queryHandlers.forEach(queryHandler => {
            handlersMap.set(queryHandler.subscribedTo(), queryHandler);
        });

        return handlersMap;
    }
}