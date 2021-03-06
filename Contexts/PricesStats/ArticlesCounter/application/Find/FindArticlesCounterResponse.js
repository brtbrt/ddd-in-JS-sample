// @flow

import type {Response} from "context-shared/domain/Response";

export class FindArticlesCounterResponse implements Response {
    #total: number;

    get total():number {
        return this.#total;
    }

    constructor(total: number) {
        this.#total = total;
    }
}
