// @flow

export class BackofficeArticleAlreadyExists extends Error {
    constructor(id: string) {
        super(`Backoffice Article ${id} already exists`);
    }
}
