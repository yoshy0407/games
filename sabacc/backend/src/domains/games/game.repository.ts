import { GameId } from './game.id';
import { Games } from './games';



export interface GameRepository {

    getById(gameId: GameId): Games
}