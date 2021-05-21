// @flow

import NumberValueObject from "../../../Shared/domain/value-object/NumberValueObject";

export default class ArticlesCounterTotal extends NumberValueObject{
    increment(): ArticlesCounterTotal {
        return new ArticlesCounterTotal(this.value + 1);
    }

    static initialize(): ArticlesCounterTotal {
        return new ArticlesCounterTotal(0);
    }
}