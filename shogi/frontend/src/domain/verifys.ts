export interface VerifyResult {
    isVerify: boolean,
    message?: string
}

export function defaultVerify(): VerifyResult {
    return {
        isVerify: false,
        message: ""
    }
}
