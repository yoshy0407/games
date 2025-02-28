import { Numbers } from "../constants/numbers";
import { Suits } from "../constants/suits";



export class Cards {

    constructor(
        readonly number: Numbers,
        readonly suit?: Suits
    ) { }

}