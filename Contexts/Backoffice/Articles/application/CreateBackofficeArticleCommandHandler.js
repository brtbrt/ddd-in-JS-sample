// @flow

import { CommandHandler } from 'context-shared/domain/CommandHandler';
import {CreateBackofficeArticleCommand} from "./CreateBackofficeArticleCommand";
import {BackofficeArticleId} from "../domain/BackofficeArticleId";
import {BackofficeArticleName} from "../domain/BackofficeArticleName";
import {BackofficeArticleUpc} from "../domain/BackofficeArticleUpc";
import {BackofficeArticleCreator} from "./ArticleCreator";
import type {Command} from "context-shared/domain/Command";

export class CreateBackofficeArticleCommandHandler implements CommandHandler<CreateBackofficeArticleCommand> {
    #articleCreator: BackofficeArticleCreator;

    constructor(articleCreator: BackofficeArticleCreator) {
        this.#articleCreator = articleCreator;
    }

    subscribedTo(): Command {
        return CreateBackofficeArticleCommand;
    }

    async handle(command: CreateBackofficeArticleCommand): Promise<void> {
        const articleId = new BackofficeArticleId(command.id);
        const articleName = new BackofficeArticleName(command.name);
        const articleUpc = new BackofficeArticleUpc(command.upc);

        await this.#articleCreator.run({ articleId, articleName, articleUpc });
    }
}
