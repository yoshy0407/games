

interface Messages {
    ja: string
}

export class ErrorCode {

    private static readonly _values: ErrorCode[] = []

    static readonly P100101 = new ErrorCode({
        code: 100101,
        message: {
            ja: "掛け金が持ち金以上です"
        }
    })
    static readonly P100102 = new ErrorCode({
        code: 100102,
        message: {
            ja: "掛け金がコールの金額に足りません"
        }
    })
    static readonly P100103 = new ErrorCode({
        code: 100103,
        message: {
            ja: "掛け金がレイズの金額に足りません"
        }
    })
    static readonly P100104 = new ErrorCode({
        code: 100104,
        message: {
            ja: "フォールド金額に足りません"
        }
    })
    static readonly G100201 = new ErrorCode({
        code: 100201,
        message: {
            ja: "ルールの上限人数を超えています"
        }
    })
    static readonly G100202 = new ErrorCode({
        code: 100202,
        message: {
            ja: "レイズ金額が、コールの金額以下です"
        }
    })
    static readonly G100203 = new ErrorCode({
        code: 100203,
        message: {
            ja: "ベッティングフェーズではありません"
        }
    })
    static readonly G100204 = new ErrorCode({
        code: 100204,
        message: {
            ja: "コーリングフェーズではありません"
        }
    })
    static readonly G100205 = new ErrorCode({
        code: 100205,
        message: {
            ja: "ゲームに参加したプレイヤーではありません"
        }
    })
    static readonly G100206 = new ErrorCode({
        code: 100206,
        message: {
            ja: "手番のプレイヤーではありません"
        }
    })
    static readonly G100207 = new ErrorCode({
        code: 100207,
        message: {
            ja: "レイズの上限を超えています"
        }
    })
    static readonly G100208 = new ErrorCode({
        code: 100208,
        message: {
            ja: "返却金額がポットの残高を超えています"
        }
    })
    static readonly G100209 = new ErrorCode({
        code: 100209,
        message: {
            ja: "シフティングフェーズではありません"
        }
    })
    static readonly G100210 = new ErrorCode({
        code: 100210,
        message: {
            ja: "ジョインフェーズではありません"
        }
    })
    static readonly G100211 = new ErrorCode({
        code: 100211,
        message: {
            ja: "プレイヤーが親ではありません"
        }
    })



    private readonly _code: number

    private readonly message: Messages

    private constructor(parameter: {
        code: number,
        message: Messages
    }) {
        this._code = parameter.code
        this.message = parameter.message
        ErrorCode._values.push(this)
    }

    get code() {
        return this._code
    }

    getMessage(language: string): string {
        return this.message[language]
    }

    equals(value: ErrorCode): boolean {
        return this._code === value._code
    }

    static values(): ErrorCode[] {
        return ErrorCode._values
    }
}