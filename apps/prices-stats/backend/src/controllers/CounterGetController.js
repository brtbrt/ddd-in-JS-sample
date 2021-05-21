// @flow
import httpStatus from 'http-status';
import { Controller } from './Controller';
import type { QueryBus } from 'context-shared';
import {FindArticlesCounterQuery} from "../../Contexts/PricesStats/ArticlesCounter/application/Find/FindArticlesCounterQuery";
import {FindArticlesCounterResponse} from "../../Contexts/PricesStats/ArticlesCounter/application/Find/FindArticlesCounterResponse";
import {ArticlesCounterNotExist} from "../../Contexts/PricesStats/ArticlesCounter/domain/ArticlesCounterNotExist";

export default class CounterGetController implements Controller {
  #queryBus: QueryBus;

  constructor(queryBus: QueryBus) {
    this.#queryBus = queryBus;
  }

  async run(req: express$Request, res: express$Response) {
    try {
      const query = new FindArticlesCounterQuery();
      const response:FindArticlesCounterResponse = await this.#queryBus.ask<FindArticlesCounterResponse>(query);

      res.status(httpStatus.OK).json(response.total);
    } catch (e) {
      if (e instanceof ArticlesCounterNotExist) {
        res.status(httpStatus.NOT_FOUND).send();
      } else {
        console.log(e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
