import { Injectable } from "@nestjs/common";
import { PlayerId } from "../player.id";
import { GameRepository } from "src/domains/games/game.repository";
import { PlayersRepository } from "../players.repository";




@Injectable()
export class PlayerDomainService {

    constructor(
        private readonly playersRepository: PlayersRepository
    ) { }

}