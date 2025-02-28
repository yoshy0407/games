import { Injectable } from "@nestjs/common";
import { Games } from "../games";
import { Players } from "src/domains/players/players";


@Injectable()
export class CallingDomainService {

    call(game: Games, actionPlayer: Players) {
        this.checkNotParent(game, actionPlayer)
    }

    notCall(game: Games, actionPlayer: Players) {

    }

    private checkNotParent(game: Games, actionPlayer: Players) {
        return !game.getPlayerIdOfParent().equals(actionPlayer.playerId)
    }
}