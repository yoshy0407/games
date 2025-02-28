

export class Suits {

    private static readonly _values: Suits[] = []

    static readonly FLASKS = new Suits(1, "フラスク")
    static readonly SABER = new Suits(2, "セーバー")
    static readonly STAVES = new Suits(3, "ステイヴ")
    static readonly COINS = new Suits(4, "コイン")

    private readonly _code: number

    private readonly _name: string

    private constructor(code: number, name: string) {
        this._code = code
        this._name = name
        Suits._values.push(this)
    }

    get code() {
        return this._code
    }

    get name() {
        return this._name
    }

    equals(value: Suits): boolean {
        return this.code === value.code
    }

    static values(): Suits[] {
        return Suits._values
    }
}