// @flow

import {FindArticlesCounterResponse} from "./FindArticlesCounterResponse";
import {ArticlesCounterRepository} from "../../domain/ArticlesCounterRepository";
import type {Nullable} from "context-shared/domain/Nullable";
import ArticlesCounter from "../../domain/ArticlesCounter";
import {ArticlesCounterNotExist} from "../../domain/ArticlesCounterNotExist";

export class ArticlesCounterFinder {
    #repository: ArticlesCounterRepository;

    constructor(repository: ArticlesCounterRepository) {
        this.#repository = repository;
    }

    async run(): Promise<FindArticlesCounterResponse> {
        const counter: Nullable<ArticlesCounter> = await this.#repository.search();
        if (counter === null) {
            throw new ArticlesCounterNotExist();
        }

        return new FindArticlesCounterResponse(counter.total.value);
    }
}
