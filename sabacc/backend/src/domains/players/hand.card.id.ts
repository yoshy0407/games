import { ValueObject } from "src/infrastructure/domain/value/value.object"
import { ValueList } from "src/infrastructure/domain/collection/list"

export type PlayerIdList = ValueList<string, HandCardId>

export const handCardIdFn = (t: string) => HandCardId.of(t)

export class HandCardId implements ValueObject<string> {

    private readonly _value: string

    constructor(value: string) {
        this._value = value
    }

    value(): string {
        return this._value
    }

    equals(value: HandCardId): boolean {
        return this.value() === value.value()
    }

    static generate() {
        return new HandCardId(crypto.randomUUID())
    }

    static of(value: string) {
        return new HandCardId(value)
    }
}