// @flow

import BackofficeArticle
    from "../../../../apps/prices-stats/backend/Contexts/Backoffice/Articles/domain/BackofficeArticle";
import type {BackofficeArticleRepository} from "../domain/BackofficeArticleRepository";
import {BackofficeArticleId} from "../domain/BackofficeArticleId";
import {BackofficeArticleName} from "../domain/BackofficeArticleName";
import {BackofficeArticleUpc} from "../domain/BackofficeArticleUpc";

type Params = {
    articleId: BackofficeArticleId;
    articleName: BackofficeArticleName;
    articleUpc: BackofficeArticleUpc;
};

export class BackofficeArticleCreator {
    #repository: BackofficeArticleRepository;
    // private eventBus: EventBus;

    //, eventBus: EventBus
    constructor(repository: BackofficeArticleRepository) {
        this.#repository = repository;
        // this.eventBus = eventBus;
    }

    async run({ articleId, articleName, articleUpc }: Params): Promise<void> {
        const course = BackofficeArticle.create(articleId, articleName, articleUpc);

        await this.#repository.save(course);
        // await this.eventBus.publish(course.pullDomainEvents());
    }
}
