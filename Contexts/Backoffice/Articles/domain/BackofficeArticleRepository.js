// @flow

import BackofficeArticle
    from "./BackofficeArticle";

export interface BackofficeArticleRepository {
    save(article: BackofficeArticle): Promise<void>;
}