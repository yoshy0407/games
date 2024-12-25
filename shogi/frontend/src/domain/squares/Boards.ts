import { Incrementor } from "@/utils/Incrementor";
import { coordinate, Coordinate } from "./Coordinate";
import { EvolutionSquares, NormalSquares, ReverseEvolutionSquares, Squares } from "./Squares";
import { createKinsho, Fu, Ginsho, Hisha, Kakugyo, Keima, Kyosha, Ohsho, Pieces } from "../Pieces";

//定数にすると、ソートして全体に影響が出てしまうので、関数化する
export function getIndexies() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9]
}

export class Boards {

    constructor(private readonly boards: Squares[][], private readonly selfHaving: Pieces[]) { }

    isMoveEvolution(playerId: string, current: Coordinate, after: Coordinate) {
        const currentSquare = this.boards[current.x][current.y]
        const piece = currentSquare.getPiece()

        if (piece === undefined) {
            return false
        }

        return this.boards[after.x][after.y].isEvolution(piece, playerId)
    }

    move(playerId: string, current: Coordinate, after: Coordinate, isEvolution: boolean): void {
        const currentSquare = this.boards[current.x][current.y]
        const piece = currentSquare.getPiece()

        if (piece !== undefined) {
            const result = piece.verifyMove(current, after, this.boards)
            if (!result) {
                return
            }
            this.putPiece(playerId, after, piece, isEvolution)
            currentSquare.removePiece()
        }

    }

    putPiece(playerId: string, coordinate: Coordinate, piece: Pieces, isEvolution: boolean): void {
        const targetSquare = this.boards[coordinate.x][coordinate.y]
        const targetPiece = targetSquare.getPiece()
        if (targetPiece !== undefined) {
            if (targetPiece.playerId !== piece.playerId) {
                targetPiece.playerId = playerId
                this.selfHaving.push(targetPiece)
            }
        }
        targetSquare.setPiece(piece, playerId, isEvolution)
    }

    search(pieceId: string): Coordinate | null {
        const xIndex = getIndexies()
        const yIndex = getIndexies()
        for (const x of xIndex) {
            for (const y of yIndex) {
                const piece = this.boards[x][y].getPiece()
                if (piece !== undefined) {
                    if (piece.pieceId === pieceId) {
                        return coordinate(x, y)
                    }
                }
            }
        }
        return null;

    }

    getSquares(): Squares[][] {
        return Object.assign(this.boards)
    }

    getSquare(coordinate: Coordinate): Squares {
        return this.boards[coordinate.x][coordinate.y]
    }

    getSelfHaving(): Pieces[] {
        return [...this.selfHaving]
    }

}

export const initBoard = (selfPlayerId: string, againstPlayerId: string) => {
    //1から始まるように調整
    let array: Squares[][] = [[], [], [], [], [], [], [], [], [], [],]
    const incrementor = new Incrementor(1)
    createFirstRow(array, 1, againstPlayerId, incrementor)
    createSecondRow(array, 2, true, againstPlayerId, incrementor)
    createThirdRow(array, 3, true, againstPlayerId, incrementor)
    createEmptyRow(array, 4)
    createEmptyRow(array, 5)
    createEmptyRow(array, 6)
    createThirdRow(array, 7, false, selfPlayerId, incrementor)
    createSecondRow(array, 8, false, selfPlayerId, incrementor)
    createFirstRow(array, 9, selfPlayerId, incrementor)
    return array;
}

function createFirstRow(arrays: Squares[][], rowNum: number, playerId: string, incrementor: Incrementor) {
    getIndexies().map(i => {
        var piece = undefined
        if (i === 1 || i === 9) {
            piece = new Kyosha(incrementor.getAndIncrement().toString(), playerId)
        }
        if (i === 2 || i === 8) {
            piece = new Keima(incrementor.getAndIncrement().toString(), playerId)
        }
        if (i === 3 || i === 7) {
            piece = new Ginsho(incrementor.getAndIncrement().toString(), playerId)
        }
        if (i === 4 || i === 6) {
            piece = createKinsho(incrementor.getAndIncrement().toString(), playerId)
        }
        if (i === 5) {
            piece = new Ohsho(incrementor.getAndIncrement().toString(), playerId)
        }

        arrays[i][rowNum] = new NormalSquares(piece)
    })

}

function createSecondRow(arrays: Squares[][], rowNum: number, reverse: boolean, playerId: string, incrementor: Incrementor) {
    getIndexies().map(i => {
        var piece = undefined
        if ((reverse && i === 2)
            || (!reverse && i === 8)) {
            arrays[i][rowNum] = new NormalSquares(new Kakugyo(incrementor.getAndIncrement().toString(), playerId))
        } else if ((reverse && i === 8)
            || (!reverse && i === 2)) {
            arrays[i][rowNum] = new NormalSquares(new Hisha(incrementor.getAndIncrement().toString(), playerId))
        } else {
            arrays[i][rowNum] = new NormalSquares()
        }
    })
}

function createThirdRow(arrays: Squares[][], rowNum: number, reverse: boolean, playerId: string, incrementor: Incrementor) {
    getIndexies().map(i => {
        var fu = new Fu(incrementor.getAndIncrement().toString(), playerId)
        arrays[i][rowNum] = reverse ? new EvolutionSquares(fu) : new ReverseEvolutionSquares(fu)
    })
}

function createEmptyRow(arrays: Squares[][], rowNum: number) {
    getIndexies().map(i => {
        arrays[i][rowNum] = new NormalSquares()
    })
}