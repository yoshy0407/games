//:TODO 別の集約
import { Cards } from "../games/cards";
import { PlayerId } from "./player.id";
import { Users } from '../users/users';
import { Games } from '../games/games';
import { DomainError } from 'src/infrastructure/domain/error/domain.error';
import { ErrorCode } from 'src/infrastructure/domain/error/error.code';
import { ValueMap } from "src/infrastructure/domain/collection/map";
import { HandCardId, handCardIdFn } from "./hand.card.id";
import { HandCard } from "./hand.card";

type HandCardMap = ValueMap<string, HandCardId, HandCard>

export class Players {

    private constructor(
        private readonly _playerId: PlayerId,
        private hands: HandCardMap,
        private account: number
    ) { }

    get playerId() {
        return this._playerId
    }

    /**
     * 手札を追加します
     * @param card カード
     */
    addHands(card: Cards) {
        const hand = HandCard.create(card.number, card.suit)
        this.hands.set(hand.handCardId, hand)
    }

    /**
     * 手札を捨てます
     * @param card カード
     */
    discardHandOf(handCardId: HandCardId): Cards {
        const hand = this.hands.get(handCardId)
        this.hands.delete(handCardId)
        return new Cards(hand.number, hand.suit)
    }

    /**
     * ベットします
     * @param pod ベット先のポット
     * @param quantity ベットする数
     */
    getBetMoney(quantity: number): number {
        if (quantity > this.account) {
            throw new DomainError(ErrorCode.P100101)
        }
        this.account -= quantity
        return quantity
    }

    addMoney(quantity: number) {
        this.account += quantity
    }

    /**
     * サイコロを振ります
     * @returns 降った結果
     */
    rollDice(): number {
        //サイコロのランダム処理
        return Math.floor(Math.random() * 6) + 1
    }

    static create(user: Users) {
        const playerId = PlayerId.generateBy(user.userId)
        return new Players(playerId, new ValueMap(handCardIdFn), user.money)
    }

    static reconstruct(parameter: { playerId: PlayerId, hands: HandCardMap, money: number }) {
        return new Players(parameter.playerId, parameter.hands, parameter.money)
    }
}