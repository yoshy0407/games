

export class UserId {

    private readonly _value: string

    constructor(value: string) {
        this._value = value
    }

    get value(): string {
        return this._value
    }

    equals(value: UserId): boolean {
        return this._value === value.value
    }

    static generate(): UserId {
        return new UserId(crypto.randomUUID())
    }

    static of(value: string): UserId {
        return new UserId(value)
    }
}