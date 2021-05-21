// @flow

export class ArticlesCounterNotExist extends Error {
    constructor() {
        super('The articles counter does not exist');
    }
}
