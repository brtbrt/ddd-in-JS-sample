// @flow
import type {Query} from "../../domain/Query";
import type {Response} from '../../domain/Response';
import type {QueryBus} from "../../domain/QueryBus";
import {QueryHandlersInformation} from "./QueryHandlersInformation";
import type {QueryHandler} from "../../domain/QueryHandler";

export class InMemoryQueryBus implements QueryBus {
  #queryHandlersInformation: QueryHandlersInformation;

  constructor(queryHandlersInformation: QueryHandlersInformation) {
    this.#queryHandlersInformation = queryHandlersInformation;
  }

  ask<+R: Response>(query: Query): Promise<R> {
    const handler:QueryHandler<Query, R> = (this.#queryHandlersInformation.search(query): any);

    return handler.handle(query);
  }
}
