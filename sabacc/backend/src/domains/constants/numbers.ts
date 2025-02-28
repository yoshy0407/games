

export class Numbers {

    private static readonly _values: Numbers[] = []

    static readonly ONE = new Numbers(1, "1")
    static readonly TWO = new Numbers(2, "2")
    static readonly THREE = new Numbers(3, "3")
    static readonly FOUR = new Numbers(4, "4")
    static readonly FIVE = new Numbers(5, "5")
    static readonly SIX = new Numbers(6, "6")
    static readonly SEVEN = new Numbers(7, "7")
    static readonly EIGHT = new Numbers(8, "8")
    static readonly NINE = new Numbers(9, "9")
    static readonly TEN = new Numbers(10, "10")
    static readonly ELEVENT = new Numbers(11, "11")
    static readonly TWELVE = new Numbers(12, "コマンダー（指揮官）")
    static readonly THIRTEEN = new Numbers(13, "ミストレス（女主人）")
    static readonly FOURTEEN = new Numbers(14, "マスター（主人）")
    static readonly FIFTEEN = new Numbers(15, "エース")
    static readonly IDIOT = new Numbers(0, "イディオット（愚者）")
    static readonly QUEEN_OF_AIR_AND_DARKNESS = new Numbers(-2, "クイーン・オブ・エア・アンド・ダークネス（空と闇の女王）")
    static readonly ENDURANCE = new Numbers(-8, "エンデュアランス（忍耐）")
    static readonly BALANCE = new Numbers(-11, "バランス（天秤）")
    static readonly MODERATION = new Numbers(-14, "モデレーション（穏健）")
    static readonly DEMISE = new Numbers(-13, "デマイズ（死滅）")
    static readonly EVIL_ONE = new Numbers(-15, "イーヴル・ワン（邪悪なる者）")
    static readonly STAR = new Numbers(-17, "スター（星）")

    private readonly _code: number

    private readonly _name: string

    private constructor(code: number, name: string) {
        this._code = code
        this._name = name
        Numbers._values.push(this)
    }

    get code() {
        return this._code
    }

    get name() {
        return this._name
    }

    equals(value: Numbers): boolean {
        return this.code === value.code
    }

    static values(): Numbers[] {
        return Numbers._values
    }

    static valuesOfNumbers() {
        return Numbers._values.filter(n => {
            return !Numbers.isSpecials(n)
        })
    }

    static valuesOfSpecials() {
        return Numbers._values.filter(n => {
            return Numbers.isSpecials(n)
        })
    }

    private static isSpecials(numbers: Numbers) {
        return numbers.code === Numbers.IDIOT.code
            || numbers.code === Numbers.QUEEN_OF_AIR_AND_DARKNESS.code
            || numbers.code === Numbers.ENDURANCE.code
            || numbers.code === Numbers.BALANCE.code
            || numbers.code === Numbers.MODERATION.code
            || numbers.code === Numbers.DEMISE.code
            || numbers.code === Numbers.EVIL_ONE.code
            || numbers.code === Numbers.STAR.code
    }
}