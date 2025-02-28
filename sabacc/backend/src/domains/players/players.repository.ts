import { Players } from "./players";



export interface PlayersRepository {

    getById(): Players
}