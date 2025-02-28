import { Numbers } from "../constants/numbers";
import { Suits } from "../constants/suits";
import { HandCardId } from "./hand.card.id";


export class HandCard {

    private constructor(
        private readonly _handCardId: HandCardId,
        private readonly _number: Numbers,
        private readonly _suit?: Suits,
    ) { }

    get handCardId() {
        return this._handCardId
    }

    get number() {
        return this._number
    }

    get suit() {
        return this._suit
    }

    static create(number: Numbers, suit?: Suits) {
        return new HandCard(HandCardId.generate(), number, suit)
    }

    static reconstruct(parameter: { handCardId: HandCardId, suit: Suits, number: Numbers }) {
        return new HandCard(parameter.handCardId, parameter.number, parameter.suit)
    }
}