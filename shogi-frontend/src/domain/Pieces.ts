import { Coordinate } from '@/domain/squares/Coordinate';
import { Squares } from './squares/Squares';

export const BLACK_TEXT_CLASS = 'text-black'
export const RED_TEXT_CLASS = 'text-red-500'


export interface Pieces {

    /**
     * 一意に識別できるID
     */
    readonly pieceId: string;
    /**
     * 表示名
     */
    readonly displayName: string;

    /**
     * テキストカラーのCSS
     */
    readonly fontColor: 'text-red-500' | 'text-black'

    /**
     * 成った後かどうか
     */
    readonly isEvolved: boolean;

    /**
     * 成れる駒かどうか
     */
    readonly isCanEvolution: boolean;

    /**
     * プレイヤーID
     */
    playerId: string;

    /**
     * 表示を反対にするかどうか
     */
    reverse(playerId: string): boolean;

    /**
     * 移動可能マスの表示
     * @param coordinate 現在の座標
     * @param boards ボード
     */
    displayMove(playerId: string, coordinate: Coordinate, boards: Squares[][]): boolean;

    /**
     * 移動先のマスが正しいかどうか
     * @param currentCoordinate 現在の座標
     * @param moveCoorfinate 移動先の作業
     */
    verifyMove(currentCoordinate: Coordinate | null, moveCoorfinate: Coordinate, boards: Squares[][]): boolean;

    evolution(): Pieces | undefined;

    deEvolution(): Pieces | undefined;

}

abstract class AbstractPiece implements Pieces {
    readonly pieceId: string;
    readonly displayName: string;
    readonly fontColor: 'text-red-500' | 'text-black';
    readonly isEvolved: boolean;
    readonly isCanEvolution: boolean;
    playerId: string;

    constructor(
        pieceId: string,
        displayName: string,
        fontColor: 'text-red-500' | 'text-black',
        isEvolved: boolean,
        isCanEvolution: boolean,
        playerId: string) {
        this.pieceId = pieceId
        this.displayName = displayName
        this.fontColor = fontColor
        this.isEvolved = isEvolved
        this.isCanEvolution = isCanEvolution
        this.playerId = playerId
    }

    reverse(playerId: string): boolean {
        return this.playerId !== playerId
    }

    displayMove(playerId: string, coordinate: Coordinate, boards: Squares[][]): boolean {
        if (this.reverse(playerId)) {
            return false
        }
        var coordinates = this.moveCoordinate(coordinate, boards)

        coordinates.forEach(c => {
            const square = boards[c.x][c.y]
            if (square !== undefined) {
                square.canMove = true
            }
        })
        return true;
    }

    verifyMove(currentCoordinate: Coordinate | null, moveCoorfinate: Coordinate, boards: Squares[][]): boolean {
        if (currentCoordinate === null) {
            return true
        }
        var coordinates = this.moveCoordinate(currentCoordinate, boards)
        return coordinates.find(c => c.x === moveCoorfinate.x && c.y === moveCoorfinate.y) !== undefined
    }

    abstract evolution(): Pieces | undefined

    abstract deEvolution(): Pieces | undefined

    abstract moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[];

    protected loop(array: Coordinate[], orgin: Coordinate, boards: Squares[][], handler: (coordinate: Coordinate) => Coordinate | null) {
        let target = handler(orgin)
        for (let i = 0; i < 8; i++) {
            if (target === null) {
                break
            }

            const piece = this.getBoardPiece(target, boards)

            if (piece !== undefined) {
                //相手の駒の場合、動かして、取れるが、ループは続けない
                if (piece.playerId !== this.playerId) {
                    array.push(target)
                    break
                }

                //自分の駒なので動かせない
                if (piece.playerId === this.playerId) {
                    break
                }
            }
            array.push(target)
            target = handler(target)
        }

    }

    protected getBoardPiece(coordinate: Coordinate, boards: Squares[][]): Pieces | undefined {
        const square = boards[coordinate.x][coordinate.y]
        return square === undefined ? undefined : square.getPiece()
    }

    protected existsPiece(coordinate: Coordinate, boards: Squares[][]): boolean {
        const piece = this.getBoardPiece(coordinate, boards)
        if (piece === undefined) {
            return false;
        }
        // 同じユーザ同士のコマの場合、置けない
        return piece.playerId === this.playerId
    }

}

export class Ohsho extends AbstractPiece {

    constructor(pieceId: string, playerId: string) {
        super(pieceId, '玉', BLACK_TEXT_CLASS, false, false, playerId)
    }

    moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[] {
        var array: Coordinate[] = []
        var left = coordinate.left()
        if (left !== null && !this.existsPiece(left, boards)) {
            array.push(left)
        }
        var leftFront = coordinate.leftFront()
        if (leftFront !== null && !this.existsPiece(leftFront, boards)) {
            array.push(leftFront)
        }
        var front = coordinate.front()
        if (front !== null && !this.existsPiece(front, boards)) {
            array.push(front)
        }
        var rightFront = coordinate.rightFront()
        if (rightFront !== null && !this.existsPiece(rightFront, boards)) {
            array.push(rightFront)
        }
        var right = coordinate.right()
        if (right !== null && !this.existsPiece(right, boards)) {
            array.push(right)
        }
        var rightBehind = coordinate.rightBehind()
        if (rightBehind !== null && !this.existsPiece(rightBehind, boards)) {
            array.push(rightBehind)
        }
        var behind = coordinate.behind()
        if (behind !== null && !this.existsPiece(behind, boards)) {
            array.push(behind)
        }
        var leftBehind = coordinate.leftBehind()
        if (leftBehind !== null && !this.existsPiece(leftBehind, boards)) {
            array.push(leftBehind)
        }
        return array
    }

    evolution(): Pieces | undefined {
        return undefined;
    }

    deEvolution(): Pieces | undefined {
        return undefined;
    }

}

export function createKinsho(pieceId: string, playerId: string): Kinsho {
    return new Kinsho(pieceId, '金', BLACK_TEXT_CLASS, true, playerId)
}

export class Kinsho extends AbstractPiece {

    readonly deEvolutionPiece?: Pieces;

    constructor(
        pieceId: string,
        displayName: string = '金',
        fontColor: 'text-red-500' | 'text-black' = BLACK_TEXT_CLASS,
        isEvolved: boolean,
        playerId: string,
        deEvolutionPiece?: Pieces
    ) {
        super(pieceId, displayName, fontColor, isEvolved, false, playerId)
        this.deEvolutionPiece = deEvolutionPiece
    }

    evolution(): Pieces | undefined {
        return undefined;
    }

    deEvolution(): Pieces | undefined {
        return this.deEvolutionPiece;
    }

    moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[] {
        var array = []
        var left = coordinate.left()
        if (left != null && !this.existsPiece(left, boards)) {
            array.push(left)
        }
        var leftFront = coordinate.leftFront()
        if (leftFront != null && !this.existsPiece(leftFront, boards)) {
            array.push(leftFront)
        }
        var front = coordinate.front()
        if (front != null && !this.existsPiece(front, boards)) {
            array.push(front)
        }
        var rightFront = coordinate.rightFront()
        if (rightFront != null && !this.existsPiece(rightFront, boards)) {
            array.push(rightFront)
        }
        var right = coordinate.right()
        if (right != null && !this.existsPiece(right, boards)) {
            array.push(right)
        }
        var behind = coordinate.behind()
        if (behind != null && !this.existsPiece(behind, boards)) {
            array.push(behind)
        }
        return array
    }

}

export class Ginsho extends AbstractPiece {

    constructor(
        pieceId: string,
        playerId: string) {
        super(pieceId, "銀", BLACK_TEXT_CLASS, false, true, playerId)
    }

    evolution(): Pieces | undefined {
        return new Kinsho(this.pieceId, '銀', RED_TEXT_CLASS, true, this.playerId, this);
    }

    deEvolution(): Pieces | undefined {
        return undefined
    }

    moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[] {
        var array = []
        var leftFront = coordinate.leftFront()
        if (leftFront != null && !this.existsPiece(leftFront, boards)) {
            array.push(leftFront)
        }
        var front = coordinate.front()
        if (front != null && !this.existsPiece(front, boards)) {
            array.push(front)
        }
        var rightFront = coordinate.rightFront()
        if (rightFront != null && !this.existsPiece(rightFront, boards)) {
            array.push(rightFront)
        }
        var rightBehind = coordinate.rightBehind()
        if (rightBehind != null && !this.existsPiece(rightBehind, boards)) {
            array.push(rightBehind)
        }
        var leftBehind = coordinate.leftBehind()
        if (leftBehind != null && !this.existsPiece(leftBehind, boards)) {
            array.push(leftBehind)
        }
        return array
    }

}

export class Fu extends AbstractPiece {

    constructor(
        pieceId: string,
        playerId: string) {
        super(pieceId, '歩', BLACK_TEXT_CLASS, false, true, playerId)
    }

    evolution(): Pieces | undefined {
        return new Kinsho(this.pieceId, 'と', RED_TEXT_CLASS, true, this.playerId, this);
    }

    deEvolution(): Pieces | undefined {
        return undefined
    }

    moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[] {
        var array = []
        var front = coordinate.front()
        if (front != null && !this.existsPiece(front, boards)) {
            array.push(front)
        }
        return array
    }

}

export class Keima extends AbstractPiece {

    constructor(
        pieceId: string,
        playerId: string) {
        super(pieceId, '桂', BLACK_TEXT_CLASS, false, true, playerId)
    }

    evolution(): Pieces | undefined {
        return new Kinsho(this.pieceId, '桂', RED_TEXT_CLASS, true, this.playerId, this);
    }

    deEvolution(): Pieces | undefined {
        return undefined
    }

    moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[] {
        var array = []
        var leftFront = coordinate.leftFront()?.front()
        if (leftFront != null && !this.existsPiece(leftFront, boards)) {
            array.push(leftFront)
        }
        var rightFront = coordinate.rightFront()?.front()
        if (rightFront != null && !this.existsPiece(rightFront, boards)) {
            array.push(rightFront)
        }

        return array
    }

}

export class Kyosha extends AbstractPiece {

    constructor(
        pieceId: string,
        playerId: string) {
        super(pieceId, '香', BLACK_TEXT_CLASS, false, true, playerId)
    }

    evolution(): Pieces | undefined {
        return new Kinsho(this.pieceId, '香', RED_TEXT_CLASS, true, this.playerId, this);
    }

    deEvolution(): Pieces | undefined {
        return undefined
    }

    moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[] {
        var array: Coordinate[] = []
        this.loop(array, coordinate, boards, c => c.front())
        return array
    }

}

export class Ryuma extends AbstractPiece {

    private readonly deEvolutionPiece: Pieces;

    constructor(
        pieceId: string,
        displayname: string,
        playerId: string,
        deEvolutionPiece: Pieces
    ) {
        super(pieceId, displayname, RED_TEXT_CLASS, true, false, playerId)
        this.deEvolutionPiece = deEvolutionPiece
    }

    evolution(): Pieces | undefined {
        return
    }

    deEvolution(): Pieces | undefined {
        return this.deEvolutionPiece;
    }

    moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[] {
        var array: Coordinate[] = []

        this.loop(array, coordinate, boards, c => c.left())
        this.loop(array, coordinate, boards, c => c.leftFront())
        this.loop(array, coordinate, boards, c => c.front())
        this.loop(array, coordinate, boards, c => c.rightFront())
        this.loop(array, coordinate, boards, c => c.right())
        this.loop(array, coordinate, boards, c => c.rightBehind())
        this.loop(array, coordinate, boards, c => c.behind())
        this.loop(array, coordinate, boards, c => c.leftBehind())

        return array
    }

}

export class Hisha extends AbstractPiece {

    constructor(
        pieceId: string,
        playerId: string) {
        super(pieceId, "飛", BLACK_TEXT_CLASS, false, true, playerId)
    }

    evolution(): Pieces | undefined {
        return new Ryuma(this.pieceId, '龍', this.playerId, this)
    }

    deEvolution(): Pieces | undefined {
        return
    }

    moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[] {
        var array: Coordinate[] = []

        this.loop(array, coordinate, boards, c => c.left())
        this.loop(array, coordinate, boards, c => c.front())
        this.loop(array, coordinate, boards, c => c.right())
        this.loop(array, coordinate, boards, c => c.behind())

        return array
    }

}

export class Kakugyo extends AbstractPiece {

    constructor(
        pieceId: string,
        playerId: string) {
        super(pieceId, "角", BLACK_TEXT_CLASS, false, true, playerId)
    }

    evolution(): Pieces | undefined {
        return new Ryuma(this.pieceId, '馬', this.playerId, this)
    }

    deEvolution(): Pieces | undefined {
        return
    }

    moveCoordinate(coordinate: Coordinate, boards: Squares[][]): Coordinate[] {
        var array: Coordinate[] = []

        this.loop(array, coordinate, boards, c => c.leftFront())
        this.loop(array, coordinate, boards, c => c.rightFront())
        this.loop(array, coordinate, boards, c => c.rightBehind())
        this.loop(array, coordinate, boards, c => c.leftBehind())

        return array
    }

}