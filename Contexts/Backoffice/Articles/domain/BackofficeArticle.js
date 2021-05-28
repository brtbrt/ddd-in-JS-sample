// @flow

import type {AggregateRoot} from "context-shared/domain/AggregateRoot";
import {DomainEvent} from "context-shared/domain/DomainEvent";
import {AggregateEvents} from "context-shared/domain/AggregateRoot";
import {BackofficeArticleId} from "./BackofficeArticleId";
import {BackofficeArticleName} from "./BackofficeArticleName";
import {BackofficeArticleUpc} from "./BackofficeArticleUpc";

export default class BackofficeArticle implements AggregateRoot {
    #id: BackofficeArticleId;
    #name: BackofficeArticleName;
    #upc: BackofficeArticleUpc;

    #events: AggregateEvents;

    constructor(id: BackofficeArticleId, name: BackofficeArticleName, gtin: BackofficeArticleUpc) {
        this.#id = id;
        this.#name = name;
        this.#upc = gtin;
    }

    pullDomainEvents(): Array<DomainEvent> {
        return this.#events.pullDomainEvents();
    }

    record(event: DomainEvent): void {
        this.#events.record(event);
    }

    get id(): BackofficeArticleId {
        return this.#id;
    }

    get name(): BackofficeArticleName {
        return this.#name;
    }

    get upc(): BackofficeArticleUpc {
        return this.#upc;
    }

    toPrimitives(): any {
        return {
            id: this.#id.value,
            name: this.#name.value,
            gtin: this.#upc.value,
        };
    }

    static create(id: BackofficeArticleId, name: BackofficeArticleName, upc: BackofficeArticleUpc): BackofficeArticle {
        return new BackofficeArticle(id, name, upc);
    }

    static fromPrimitives(data: { id: string; name: string, gtin: string}): BackofficeArticle {
        return new BackofficeArticle(
            new BackofficeArticleId(data.id),
            new BackofficeArticleName(data.name),
            new BackofficeArticleUpc(data.gtin),
        );
    }
}