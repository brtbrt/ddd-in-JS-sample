// @flow

import type {BackofficeArticleRepository} from "../domain/BackofficeArticleRepository";
import {BackofficeArticleId} from "../domain/BackofficeArticleId";
import {BackofficeArticleName} from "../domain/BackofficeArticleName";
import {BackofficeArticleUpc} from "../domain/BackofficeArticleUpc";
import BackofficeArticle from "../domain/BackofficeArticle";
import {BackofficeArticleAlreadyExists} from "../domain/BackofficeArticleAlreadyExists";
import type {EventBus} from "context-shared/domain/EventBus";

type Params = {
    articleId: BackofficeArticleId;
    articleName: BackofficeArticleName;
    articleUpc: BackofficeArticleUpc;
};

export class BackofficeArticleCreator {
    #repository: BackofficeArticleRepository;
    #eventBus: EventBus;

    constructor(repository: BackofficeArticleRepository, eventBus: EventBus) {
        this.#repository = repository;
        this.#eventBus = eventBus;
    }

    async run({ articleId, articleName, articleUpc }: Params): Promise<void> {

        const backofficeArticleWithSameId = await this.#repository.getByBackofficeArticleId(articleId);

        if (backofficeArticleWithSameId !== null) {
            throw new BackofficeArticleAlreadyExists(articleId.toString());
        }

        const course = BackofficeArticle.create(articleId, articleName, articleUpc);

        await this.#repository.save(course);
        // todo continue here :) implement the event bus
        // await this.#eventBus.publish(course.pullDomainEvents());
    }
}
