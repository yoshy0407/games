import { DomainEvent } from "src/infrastructure/domain/events";
import { GamePhase } from "./game.phase";
import { PlayerId } from "src/domains/players/player.id";


export class NextActionGameEvent implements DomainEvent {

    eventName: string = "next.action.game.event"

    phase: GamePhase

    nextPlayerId: PlayerId

    constructor(phase: GamePhase, nextPlayerId: PlayerId) {
        this.phase = phase
        this.nextPlayerId = nextPlayerId
    }

}