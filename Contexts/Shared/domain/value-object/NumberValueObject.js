// @flow

export default class NumberValueObject {
    #value: number;

    constructor(value: number) {
        this.#value = value;
    }

    get value(): number {
        return this.#value;
    }

    equalsTo(other: NumberValueObject): boolean {
        return this.#value === other.value;
    }

    isBiggerThan(other: NumberValueObject): boolean {
        return this.value > other.value;
    }
}
