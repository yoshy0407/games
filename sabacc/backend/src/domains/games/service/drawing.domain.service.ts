import { Injectable } from "@nestjs/common";
import { Games } from "../games";
import { Players } from "src/domains/players/players";


@Injectable()
export class DrawingDomainService {

    drawOf(game: Games, actionPlayer: Players) {

    }
}