import { Incrementor } from '../../utils/Incrementor';
import { HavingBoardProps } from '../../components/molecules/HavingBoard';
import { BLACK_TEXT_CLASS, createKinsho, Fu, Ginsho, Hisha, Kakugyo, Keima, Kinsho, Kyosha, Ohsho, Pieces } from "../Pieces";
import { coordinate, Coordinate } from './Coordinate';


export interface Squares {

    canMove: boolean;

    setPiece(piece: Pieces, playerId: string, isEvolution: boolean): void;

    isExistPiece(): boolean;

    isEvolution(piece: Pieces, playerId: string): boolean;

    getPiece(): Pieces | undefined;

    removePiece(): void
}

export class NormalSquares implements Squares {

    canMove: boolean;

    protected piece?: Pieces;

    constructor(piece?: Pieces) {
        this.canMove = false
        this.piece = piece
    }

    setPiece(piece: Pieces, playerId: string, isEvolution: boolean): void {
        this.piece = piece
    }

    isExistPiece(): boolean {
        return this.piece !== undefined
    }

    isEvolution(piece: Pieces, playerId: string): boolean {
        return false;
    }

    getPiece(): Pieces | undefined {
        return this.piece
    }

    removePiece(): void {
        this.piece = undefined
    }

}

export class EvolutionSquares extends NormalSquares {
    constructor(piece?: Pieces) {
        super(piece)
    }

    isEvolution(piece: Pieces, playerId: string): boolean {
        return !piece.reverse(playerId) && piece.isCanEvolution
    }

    setPiece(piece: Pieces, playerId: string, isEvolution: boolean): void {
        let candidatePiece = piece
        if (this.isEvolution(piece, playerId) && isEvolution) {
            const evoPiece = piece.evolution()
            if (evoPiece !== undefined) {
                candidatePiece = evoPiece
            }
        }
        super.setPiece(candidatePiece, playerId, isEvolution)
    }

}

export class ReverseEvolutionSquares extends NormalSquares {
    constructor(piece?: Pieces) {
        super(piece)
    }

    isEvolution(piece: Pieces, playerId: string): boolean {
        return piece.reverse(playerId) && piece.isCanEvolution
    }

    setPiece(piece: Pieces, playerId: string, isEvolution: boolean): void {
        let candidatePiece = piece
        if (this.isEvolution(piece, playerId) && isEvolution) {
            const evoPiece = piece.evolution()
            if (evoPiece !== undefined) {
                candidatePiece = evoPiece
            }
        }
        super.setPiece(candidatePiece, playerId, isEvolution)
    }

}
