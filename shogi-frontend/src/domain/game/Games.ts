import { VerifyResult } from "../verifys"

export default function verifyGameId(gameId: string): VerifyResult {
    if (gameId.length !== 10) {
        return {
            isVerify: false,
            message: "桁数は10桁である必要があります"
        }
    }
    if (!/^\d+$/.test(gameId)) {
        return {
            isVerify: false,
            message: "ゲームIDは数字のみで構成されます"
        }

    }
    return {
        isVerify: true
    }
}