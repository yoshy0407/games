import { Deck } from './deck';
import { GameId } from "./game.id"
import { Pot } from './pot';
import { PlayerId, playerIdFn, PlayerIdList } from '../players/player.id';
import { GamePhase } from './game.phase';
import { DomainError } from 'src/infrastructure/domain/error/domain.error';
import { ErrorCode } from 'src/infrastructure/domain/error/error.code';
import { PlayerInfo } from './player.info';
import { Aggregation } from 'src/infrastructure/domain/aggregation';
import { ValueMap } from 'src/infrastructure/domain/collection/map';
import { ValueList } from 'src/infrastructure/domain/collection/list';
import { NextActionGameEvent } from './events';


export type PlayerInfoMap = ValueMap<string, PlayerId, PlayerInfo>

/**
 * ゲーム
 */
export class Games extends Aggregation {

    private constructor(
        private readonly _gameId: GameId,
        public playerInfos: PlayerInfoMap,
        public phase: GamePhase,
        private _deck: Deck = null,
        private handPot: Pot,
        private sabaccPot: Pot,
        public callAmount: number,
        private actionedPlayerIds: PlayerIdList,
        private actionPlayerId: PlayerId | null
    ) {
        super()
    }

    get gameId() {
        return this._gameId
    }

    get playerIds(): PlayerIdList {
        const temp = Array.from(this.playerInfos.keys())
        return new ValueList(playerIdFn, temp)
    }

    get deck() {
        return this._deck
    }

    getPlayerInfo(playerId: PlayerId) {
        return this.playerInfos.get(playerId)
    }

    getPlayerIdOfParent() {
        for (let entry of this.playerInfos.entries()) {
            if (entry[1].parent) {
                return entry[0]
            }
        }
    }

    getLeftPlayerId(playerId: PlayerId) {
        const playerIds = this.getOrderedPlayerIds()
        const nextIndex = playerIds.indexOf(playerId) + 1
        if (nextIndex <= playerIds.length) {
            return playerIds.get(0)
        } else {
            return playerIds.get(nextIndex)
        }
    }

    getRightPlayerId(playerId: PlayerId) {
        const playerIds = this.getOrderedPlayerIds()
        const nextIndex = playerIds.indexOf(playerId) + 1
        if (nextIndex <= 0) {
            return playerIds.get(playerIds.length)
        } else {
            return playerIds.get(nextIndex)
        }
    }

    private getOrderedPlayerIds() {
        const playerIds = new ValueList(playerIdFn)
        for (let entry of this.playerInfos.entries()) {
            if (!entry[1].isFold) {
                playerIds.push(entry[0])
            }
        }
        return playerIds
    }

    /**
     * ジョインフェーズのメソッド
     */

    /**
     * ゲームに参加するプレイヤーを追加する
     * @param player 
     * @param isContinue 継続して参加しているゲームか
     */
    joinOf(playerId: PlayerId, isContinued: boolean, handpotBet: number, sabbacPotBet: number) {
        this.checkJoinPhase()
        const count = this.playerInfos.size + 1
        if (8 > count) {
            throw new DomainError(ErrorCode.G100201)
        }
        const playerInfo = PlayerInfo.create({ playerId, isContinued, parent: false })
        this.playerInfos.set(playerId, playerInfo)
        this.handPot.put(handpotBet)
        if (!isContinued) {
            this.sabaccPot.put(sabbacPotBet)
        }
    }

    /**
     * ゲームからプレイヤーを外す
     * @param player 
     */
    separateOf(playerId: PlayerId): number {
        this.checkJoinPhase()
        const playerInfo = this.playerInfos.get(playerId)
        this.playerInfos.delete(playerId)

        //掛け金の返却処理
        let total = 0
        if (!playerInfo.isContinued) {
            total += this.sabaccPot.take(1)
        }
        total += this.handPot.take(1)
        return total
    }

    /**
     * ゲームを開始する
     */
    start(deck: Deck) {
        this.checkJoinPhase()
        this._deck = deck

        //順番を設定
        const playerIds = new ValueList(playerIdFn)
        let parentPlayerId = null

        //親を特定しながら、配列を作成
        for (let entry of this.playerInfos.entries()) {
            const playerId = entry[0]
            const playerInfo = entry[1]

            playerIds.push(playerId)

            if (playerInfo.parent) {
                parentPlayerId = playerId
                playerInfo.order = 1
            }
        }

        //順番を確定させる
        let nextIndex = playerIds.indexOf(parentPlayerId) + 1
        let order = 2
        Array(this.playerInfos.size).forEach((i) => {
            if (nextIndex > this.playerInfos.size) {
                nextIndex = 0
            }
            const playerId = playerIds[nextIndex]
            this.playerInfos.get(playerId).order = order
            nextIndex = playerIds.indexOf(playerId) + 1
            order++
        })
    }

    private checkJoinPhase() {
        if (!this.phase.equals(GamePhase.JOIN_PHASE)) {
            throw new DomainError(ErrorCode.G100210)
        }
    }

    /**
     * ベッティングフェーズのメソッド
     */

    /**
     * 最初のベットを実施します
     * @param playerId プレイヤーID
     * @param quantity 数量
     */
    bet(playerId: PlayerId, quantity: number) {
        this.checkBettingPhase()
        this.checkActualPlayer(playerId)
        this.callAmount = quantity
        this.handPot.put(quantity)
        this.actionedPlayerIds.push(playerId)
    }

    /**
     * ゲームにコールの処理を実施します
     */
    continue(playerId: PlayerId): number {
        this.checkBettingPhase()
        this.checkActualPlayer(playerId)
        this.handPot.put(this.callAmount)
        this.actionedPlayerIds.push(playerId)
        return this.callAmount
    }

    /**
     * ゲームにレイズします
     * @param quantity 
     */
    raise(playerId: PlayerId, quantity: number) {
        this.checkBettingPhase()
        this.checkActualPlayer(playerId)
        if (this.callAmount >= quantity) {
            throw new DomainError(ErrorCode.G100202)
        }
        this.callAmount = quantity
        this.handPot.put(quantity)
        this.actionedPlayerIds.push(playerId)
    }

    /**
     * フォールドします
     * @param playerId プレイヤーID
     * @returns 
     */
    fold(playerId: PlayerId): number {
        this.checkBettingPhase()
        this.checkActualPlayer(playerId)
        this.sabaccPot.put(1)
        this.actionedPlayerIds.push(playerId)
        this.playerInfos.get(playerId).isFold = true
        return 1
    }

    private checkBettingPhase() {
        if (!this.phase.equals(GamePhase.BETTING_PHASE)) {
            throw new DomainError(ErrorCode.G100203)
        }
    }

    /**
     * コーリングフェーズのメソッド
     */

    /**
     * コールします
     * @param playerId 
     */
    call(playerId: PlayerId) {
        this.checkActualPlayer(playerId)
        this.checkCallingPhase()
        //:TODO 親を全員やってからじゃないとコールできない
        this.actionedPlayerIds.push(playerId)
        this.next(playerId)
        //イベント発行でコールのステータスとする？
    }

    /**
     * コールしません
     * @param playerId 
     */
    notCall(playerId: PlayerId) {
        this.checkActualPlayer(playerId)
        this.checkCallingPhase()
        this.actionedPlayerIds.push(playerId)
        this.next(playerId)
    }

    private checkCallingPhase() {
        if (!this.phase.equals(GamePhase.CALLING_PHASE)) {
            throw new DomainError(ErrorCode.G100204)
        }
    }

    private checkActualPlayer(playerId: PlayerId) {
        if (!playerId.equals(this.actionPlayerId)) {
            throw new DomainError(ErrorCode.G100206)
        }
    }

    /**
     * 手番を次へ渡します
     */
    public next(nextPlayerId: PlayerId, nextPhase: GamePhase) {
        if (nextPhase !== this.phase) {
            this.actionedPlayerIds = new ValueList(playerIdFn)
            this.phase = nextPhase
        }
        this.actionPlayerId = nextPlayerId
        this.publishNextEvent(this.phase, this.actionPlayerId)
    }

    private publishNextEvent(phase: GamePhase, actionPlayerId: PlayerId) {
        this.publishEvent(new NextActionGameEvent(phase, actionPlayerId))
    }

    static create(creatorPlayerId: PlayerId) {

        const map: ValueMap<string, PlayerId, PlayerInfo> = new ValueMap(playerIdFn)
        map.set(creatorPlayerId, PlayerInfo.create({ playerId: creatorPlayerId, isContinued: false, parent: true }))

        return new Games(
            GameId.generate(),
            map,
            GamePhase.JOIN_PHASE,
            null,
            new Pot(),
            new Pot(),
            0,
            new ValueList(playerIdFn),
            null)
    }

    static reconstruct(parameter: {
        gameId: GameId,
        playerInfos: ValueMap<string, PlayerId, PlayerInfo>,
        phase: GamePhase,
        deck: Deck,
        handPod: Pot,
        sabaccPod: Pot,
        callAmount: number,
        actionedPlayerIds: PlayerIdList,
        actionPlayerId?: PlayerId
    }) {
        return new Games(
            parameter.gameId,
            parameter.playerInfos,
            parameter.phase,
            parameter.deck,
            parameter.handPod,
            parameter.sabaccPod,
            parameter.callAmount,
            parameter.actionedPlayerIds,
            parameter.actionPlayerId)
    }
}

