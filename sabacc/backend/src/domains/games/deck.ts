import { Numbers } from "../constants/numbers";
import { Suits } from "../constants/suits";
import { Cards } from "./cards";



export class Deck {

    constructor(
        private cards: Cards[],
        private disposedCards: Cards[]
    ) { }

    draw() {
        //カードがなくなった場合、捨て札から復活させる
        if (this.cards.length <= 0) {
            this.cards = this.disposedCards
            this.shuffle()
        }
        return this.cards.pop()
    }

    shuffle() {
        for (let i = (this.cards.length - 1); 0 < i; i--) {
            let r = Math.floor(Math.random() * (i + 1))

            let tmp = this.cards[i]
            this.cards[i] = this.cards[r]
            this.cards[r] = tmp
        }
    }

    add(card: Cards) {
        this.cards.push(card)
    }

    static createDeck() {
        const cards = []
        Suits.values().forEach((s) => {
            Numbers.valuesOfNumbers().forEach((n) => {
                cards.push(new Cards(n, s))
            })
        })

        Numbers.valuesOfSpecials().forEach((n) => {
            cards.push(new Cards(n))
        })
        return new Deck(cards, [])
    }

    static reconstruct(parameter: { cards: Cards[], disposedCards: Cards[] }) {
        return new Deck(parameter.cards, parameter.disposedCards)
    }
}