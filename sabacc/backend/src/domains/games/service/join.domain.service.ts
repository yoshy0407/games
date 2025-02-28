import { Players } from 'src/domains/players/players';
import { Games } from '../games';
import { Injectable } from "@nestjs/common";
import { Deck } from '../deck';
import { DomainError } from 'src/infrastructure/domain/error/domain.error';
import { ErrorCode } from 'src/infrastructure/domain/error/error.code';
import { GamePhase } from '../game.phase';


@Injectable()
export class JoinDomainService {

    joinGameOf(game: Games, player: Players, isContinued: boolean) {
        //最初にジョインする場合は、ハンドポットとサバックポッドに入れる必要あり
        //２回目以降は、ハンドポットのみ
        const handPotBet = player.getBetMoney(1)
        let sabbacPotBet = 0
        if (!isContinued) {
            sabbacPotBet = player.getBetMoney(1)
        }
        game.joinOf(player.playerId, isContinued, handPotBet, sabbacPotBet)

    }

    seprateGameOf(game: Games, player: Players) {
        const returnMoney = game.separateOf(player.playerId)
        player.addMoney(returnMoney)
    }

    startGameOf(game: Games, players: Players[]) {
        // デッキの準備
        const deck = Deck.createDeck()
        deck.shuffle()

        // 手札を配る
        const playerIds = game.playerIds
        Array(2).forEach((i) => {
            players.forEach((p) => {
                if (!playerIds.includes(p.playerId)) {
                    throw new DomainError(ErrorCode.G100205)
                }
                const card = deck.draw()
                p.addHands(card)
            })
        })
        game.start(deck)
        const nextPlayerId = game.getPlayerIdOfParent()
        game.next(nextPlayerId, GamePhase.BETTING_PHASE)
    }
}