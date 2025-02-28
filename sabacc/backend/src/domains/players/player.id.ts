import { ValueObject } from "src/infrastructure/domain/value/value.object"
import { UserId } from "../users/user.id"
import { ValueList } from "src/infrastructure/domain/collection/list"

export type PlayerIdList = ValueList<string, PlayerId>

export const playerIdFn = (t: string) => PlayerId.of(t)

export class PlayerId implements ValueObject<string> {

    private readonly _value: string

    constructor(value: string) {
        this._value = value
    }

    value(): string {
        return this._value
    }

    equals(value: PlayerId): boolean {
        return this.value() === value.value()
    }

    static generateBy(userId: UserId) {
        return new PlayerId(userId.value)
    }

    static of(value: string) {
        return new PlayerId(value)
    }
}