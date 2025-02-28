import { UserId } from "./user.id";

export class Users {

    constructor(
        readonly userId: UserId,
        readonly money: number
    ) { }
}