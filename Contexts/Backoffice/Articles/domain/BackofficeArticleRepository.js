// @flow

import BackofficeArticle
    from "./BackofficeArticle";
import {BackofficeArticleId} from "./BackofficeArticleId";
import type {Nullable} from "context-shared/domain/Nullable";

export interface BackofficeArticleRepository {
    save(article: BackofficeArticle): Promise<void>;
    getByBackofficeArticleId(id: BackofficeArticleId): Promise<Nullable<BackofficeArticle>>;
}