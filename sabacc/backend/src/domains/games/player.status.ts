

export class PlayerStatus {

    private static readonly _values: PlayerStatus[] = []

    static readonly FOLDED = new PlayerStatus(1, "folded")
    static readonly STAND = new PlayerStatus(2, "stand")
    static readonly PLAY = new PlayerStatus(3, "play")

    private readonly _code: number

    private readonly _name: string

    private constructor(code: number, name: string) {
        this._code = code
        this._name = name
        PlayerStatus._values.push(this)
    }

    get code() {
        return this._code
    }

    get name() {
        return this._name
    }

    equals(value: PlayerStatus): boolean {
        return this.code === value.code
    }

    static values(): PlayerStatus[] {
        return PlayerStatus._values
    }

}