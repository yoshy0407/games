import { DomainError } from "src/infrastructure/domain/error/domain.error";
import { PlayerId } from "../players/player.id";
import { ErrorCode } from "src/infrastructure/domain/error/error.code";


export class PlayerInfo {

    private constructor(
        private readonly _playerId: PlayerId,
        private readonly _isContinued: boolean,
        private _isFold: boolean,
        private _order: number | null,
        private _parent: boolean,
        private _maxRaise: number
    ) { }

    get playerId() {
        return this._playerId
    }

    get isContinued() {
        return this._isContinued
    }

    get isFold() {
        return this._isFold
    }

    set isFold(fold: boolean) {
        this._isFold = fold
    }

    get order() {
        return this._order
    }

    set order(order: number) {
        this._order = order
    }

    get parent() {
        return this._parent
    }

    get maxRaise() {
        return this._maxRaise
    }

    /**
     * レイズ上限をチェックします
     * @param quantity レイズ数
     */
    checkAndAddMaxRaise(quantity: number) {
        const candidateMax = this._maxRaise + quantity
        if (candidateMax > 10) {
            throw new DomainError(ErrorCode.G100207)
        }
        this._maxRaise += quantity
    }

    static create(parameter: { playerId: PlayerId, isContinued: boolean, parent: boolean }) {
        return new PlayerInfo(parameter.playerId, parameter.isContinued, false, null, parameter.parent, 0)
    }

}