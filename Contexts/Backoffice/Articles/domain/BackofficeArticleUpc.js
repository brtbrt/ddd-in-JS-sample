// @flow
import StringValueObject from "context-shared/domain/value-object/StringValueObject";
import validbarcode from "barcode-validator";
import {InvalidArgumentError} from "context-shared/domain/value-object/InvalidArgumentError";

export class BackofficeArticleUpc {
    #value: string;

    constructor(value: string) {
        this._assertValidUpc(value);
        this.#value = value;
    }

    get value(): string {
        return this.#value;
    }

    _assertValidUpc(value: string):void {
        if (!validbarcode(value)) {
            throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`);
        }
    }

}