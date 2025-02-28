import { PlayerId, playerIdFn, PlayerIdList } from "../players/player.id"
import { PlayerInfoMap } from "./games"
import { ValueList } from "src/infrastructure/domain/collection/list"

export class GamePhase {

    private static readonly _values: GamePhase[] = []

    static readonly JOIN_PHASE = new GamePhase(0, "ジョイン・フェーズ")
    static readonly BETTING_PHASE = new GamePhase(1, "ベッティング・フェーズ")
    static readonly SHIFTING_PHASE = new GamePhase(2, "シフティング・フェーズ")
    static readonly CALLING_PHASE = new GamePhase(3, "コーリング・フェーズ")
    static readonly DRAWING_PHASE = new GamePhase(4, "ドローイング・フェーズ")

    private readonly _code: number

    private readonly _name: string

    private constructor(code: number, name: string) {
        this._code = code
        this._name = name
        GamePhase._values.push(this)
    }

    get code() {
        return this._code
    }

    get name() {
        return this._name
    }
    equals(value: GamePhase): boolean {
        return this.code === value.code
    }

    static values(): GamePhase[] {
        return GamePhase._values
    }

}