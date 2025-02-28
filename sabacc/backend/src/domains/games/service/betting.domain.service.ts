import { GamePhase } from "../game.phase"
import { Games } from "../games"
import { Players } from "src/domains/players/players"
import { PlayerId } from "src/domains/players/player.id"
import { Injectable } from "@nestjs/common"

@Injectable()
export class BettingDomainService {

    /**
     * ベッティングフェーズのメソッド
     */

    /**
     * 最初のベットを実施します
     * @param playerId プレイヤーID
     * @param quantity 数量
     */
    bet(game: Games, player: Players, quantity: number) {
        const betMoney = player.getBetMoney(quantity)
        game.bet(player.playerId, betMoney)
        const [nextPlayerId, nextPhase] = this.nextAction(game, player.playerId)
        game.next(nextPlayerId, nextPhase)
    }

    /**
     * ゲームにコールの処理を実施します
     */
    continue(game: Games, player: Players) {
        const betMoney = game.continue(player.playerId)
        player.getBetMoney(betMoney)
        const [nextPlayerId, nextPhase] = this.nextAction(game, player.playerId)
        game.next(nextPlayerId, nextPhase)
    }

    /**
     * ゲームにレイズします
     * @param quantity 
     */
    raise(game: Games, player: Players, quantity: number) {
        const betMoney = player.getBetMoney(quantity)
        game.raise(player.playerId, betMoney)
        const [nextPlayerId, nextPhase] = this.nextAction(game, player.playerId)
        game.next(nextPlayerId, nextPhase)
    }

    /**
     * フォールドします
     * @param playerId プレイヤーID
     * @returns 
     */
    fold(game: Games, player: Players) {
        const betMoney = game.fold(player.playerId)
        player.getBetMoney(betMoney)
        const [nextPlayerId, nextPhase] = this.nextAction(game, player.playerId)
        game.next(nextPlayerId, nextPhase)
    }

    private nextAction(game: Games, actionPlayerId: PlayerId): [PlayerId, GamePhase] {
        const playerInfos = game.playerInfos
        const actionPlayerInfo = playerInfos.get(actionPlayerId)
        const nextOrder = actionPlayerInfo.order + 1

        // 配列の要素を超え、全プレイヤーがアクション済みの場合次のフェーズへ移る
        if (playerInfos.size < nextOrder) {
            //最初の手番のプレイヤーを探す
            //シフティングフェーズでは、親が最初に動く
            const nextPlayerId = game.getPlayerIdOfParent()
            return [nextPlayerId, GamePhase.SHIFTING_PHASE]
            //同じフェーズで次のプレイヤーを探す
        } else {
            const nextPlayerId = game.getLeftPlayerId(actionPlayerId)
            return [nextPlayerId, GamePhase.BETTING_PHASE]
        }

    }

}