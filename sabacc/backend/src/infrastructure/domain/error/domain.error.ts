import { CustomError } from "src/infrastructure/error/custom.error";
import { ErrorCode } from "./error.code";

export class DomainError extends CustomError {

    constructor(public errorCode: ErrorCode) {
        super(errorCode.getMessage("ja"))
    }
}