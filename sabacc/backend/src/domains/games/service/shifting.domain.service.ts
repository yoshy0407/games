import { Injectable } from "@nestjs/common";
import { Games } from "../games";
import { Players } from "src/domains/players/players";
import { DomainError } from "src/infrastructure/domain/error/domain.error";
import { ErrorCode } from "src/infrastructure/domain/error/error.code";
import { GamePhase } from '../game.phase';
import { HandCardId } from "src/domains/players/hand.card.id";



@Injectable()
export class ShiftingDomainService {

    /**
     * シフティングフェーズの親のオペレーションを実行します
     * @param game 
     * @param player 
     */
    parentActionOf(game: Games, player: Players) {

        const parentPlayerId = game.getPlayerIdOfParent()
        if (!parentPlayerId.equals(player.playerId)) {
            throw new DomainError(ErrorCode.G100211)
        }

        const result = player.rollDice()

        //4, 5, 6の場合、シフティング発生
        if ([4, 5, 6].includes(result)) {
            const nextPlayer = game.getRightPlayerId(player.playerId)
            game.next(nextPlayer, GamePhase.SHIFTING_PHASE)
        } else {
            const nextPlayer = game.getPlayerIdOfParent()
            game.next(nextPlayer, GamePhase.CALLING_PHASE)
        }
    }

    /**
     * 相手の手札の選択と破棄を実施します
     * @param game ゲーム
     * @param actionPlayer 実行したプレイヤー
     * @param disposedPlayer 手札を選ばれるプレイヤー 
     * @param players プレイヤーのリスト
     * @param disposeHandCardId 捨てる手札のID
     */
    disposeHand(game: Games, actionPlayer: Players, disposedPlayer: Players, players: Players[], disposeHandCardId: HandCardId) {
        const card = disposedPlayer.discardHandOf(disposeHandCardId)
        game.deck.add(card)

        const nextPlayerId = game.getRightPlayerId(actionPlayer.playerId)
        const parentPlayerId = game.getPlayerIdOfParent()

        //次のプレイヤーが親である場合、一巡したとみなしフェーズを終了する
        if (nextPlayerId.equals(parentPlayerId)) {
            //デッキをシャッフル
            const deck = game.deck
            deck.shuffle()
            //手札を１枚配る
            players.forEach((p) => {
                const card = deck.draw()
                p.addHands(card)
            })
            game.next(parentPlayerId, GamePhase.CALLING_PHASE)
        } else {
            game.next(nextPlayerId, GamePhase.SHIFTING_PHASE)
        }
    }
}