import { ValueObject } from "src/infrastructure/domain/value/value.object"

export class GameId implements ValueObject<string> {

    private readonly _value: string

    constructor(value: string) {
        this._value = value
    }

    value(): string {
        return this._value
    }

    equals(value: GameId): boolean {
        return this.value() === value.value()
    }

    static generate(): GameId {
        return new GameId(crypto.randomUUID())
    }

    static of(value: string): GameId {
        return new GameId(value)
    }
}