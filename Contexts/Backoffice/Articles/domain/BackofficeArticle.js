// @flow

import type {AggregateRoot} from "context-shared/domain/AggregateRoot";
import {DomainEvent} from "context-shared/domain/DomainEvent";
import {AggregateEvents} from "context-shared/domain/AggregateRoot";
import {BackofficeArticleId} from "./BackofficeArticleId";
import {BackofficeArticleName} from "./BackofficeArticleName";
import {BackofficeArticleUpc} from "./BackofficeArticleUpc";
import {BackofficeArticleCreatedDomainEvent} from "./BackofficeArticleCreatedDomainEvent";
import type {PublishableDomainEvent} from "context-shared/domain/PublishableDomainEvent";
import type {DomainEventInterface} from "context-shared/domain/DomainEventInterface";

export default class BackofficeArticle implements AggregateRoot {
    #id: BackofficeArticleId;
    #name: BackofficeArticleName;
    #upc: BackofficeArticleUpc;

    #domainEvents: AggregateEvents;

    constructor(id: BackofficeArticleId, name: BackofficeArticleName, gtin: BackofficeArticleUpc) {
        this.#id = id;
        this.#name = name;
        this.#upc = gtin;

        this.#domainEvents = new AggregateEvents();
    }

    pullDomainEvents(): Array<PublishableDomainEvent & DomainEventInterface> {
        return this.#domainEvents.pullDomainEvents();
    }

    record(event: PublishableDomainEvent & DomainEventInterface): void {
        this.#domainEvents.record(event);
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
            upc: this.#upc.value,
        };
    }

    static create(id: BackofficeArticleId, name: BackofficeArticleName, upc: BackofficeArticleUpc): BackofficeArticle {
        const backofficeArticle = new BackofficeArticle(id, name, upc);
        backofficeArticle.record(
            new BackofficeArticleCreatedDomainEvent({
                id: backofficeArticle.id.value,
                name: backofficeArticle.name.value,
                upc: backofficeArticle.upc.value
            })
        );

        return backofficeArticle;
    }

    static fromPrimitives(data: { id: string; name: string, upc: string}): BackofficeArticle {
        return new BackofficeArticle(
            new BackofficeArticleId(data.id),
            new BackofficeArticleName(data.name),
            new BackofficeArticleUpc(data.upc),
        );
    }
}