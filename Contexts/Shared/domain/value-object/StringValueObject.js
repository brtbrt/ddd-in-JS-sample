// @flow

export default class StringValueObject {
    #value: string;

    constructor(value: string) {
        this.#value = value;
    }

    toString(): string {
        return this.#value;
    }

    get value(): string {
        return this.#value;
    }
}
