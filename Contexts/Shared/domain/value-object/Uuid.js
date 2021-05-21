// @flow

import { v4 } from 'uuid';
import validate from 'uuid-validate';
import { InvalidArgumentError } from './InvalidArgumentError';

export class Uuid {
    #value: string;

    constructor(value: string) {
        this._ensureIsValidUuid(value);

        this.#value = value;
    }

    get value (): string {
        return this.#value;
    }

    static random(): Uuid {
        return new Uuid(v4());
    }

    toString(): string {
        return this.value;
    }

    _ensureIsValidUuid(id: string): void {
        if (!validate(id)) {
            throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
        }
    }
}
