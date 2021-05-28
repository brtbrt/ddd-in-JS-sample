// @flow

import { Command } from 'context-shared/domain/Command';

type Params = {
    id: string;
    name: string;
    upc: string;
};

export class CreateBackofficeArticleCommand implements Command {
    #id: string;
    #name: string;
    #upc: string;

    constructor({ id, name, upc }: Params) {
        this.#id = id;
        this.#name = name;
        this.#upc = upc;
    }

    get id(): string {
        return this.#id;
    }

    get name(): string {
        return this.#name;
    }

    get upc(): string {
        return this.#upc;
    }
}
