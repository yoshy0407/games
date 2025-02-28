import { DomainError } from "src/infrastructure/domain/error/domain.error"
import { ErrorCode } from "src/infrastructure/domain/error/error.code"

export class Pot {

    constructor(
        private account: number = 0
    ) { }

    /**
     * ポットに金額を追加します
     * @param quantity 金額
     */
    put(quantity: number) {
        this.account += quantity
    }

    /**
     * ポットから金額を取り出します
     * @param quantity 金額
     * @returns 取り出した金額
     */
    take(quantity: number) {
        if (quantity > this.account) {
            throw new DomainError(ErrorCode.G100208)
        }
        this.account -= quantity
        return quantity
    }

}