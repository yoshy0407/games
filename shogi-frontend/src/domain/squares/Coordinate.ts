export interface Coordinate {
    /**
     * X座標
     */
    readonly x: number;

    /**
     * Y座標
     */
    readonly y: number;

    toId(): string;

    left(): Coordinate | null

    leftFront(): Coordinate | null

    front(): Coordinate | null

    rightFront(): Coordinate | null

    right(): Coordinate | null

    rightBehind(): Coordinate | null

    behind(): Coordinate | null

    leftBehind(): Coordinate | null

}

class CoordinateImpl implements Coordinate {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    toId(): string {
        return `x${this.x}-y${this.y}`
    }

    left(): Coordinate | null {
        return this.isExistLeft()
            ? new CoordinateImpl(this.shiftLeft(), this.y)
            : null;

    }
    leftFront(): Coordinate | null {
        return (this.isExistLeft() && this.isExistFront())
            ? new CoordinateImpl(this.shiftLeft(), this.shiftFront())
            : null;
    }
    front(): Coordinate | null {
        return this.isExistFront()
            ? new CoordinateImpl(this.x, this.shiftFront())
            : null;
    }

    rightFront(): Coordinate | null {
        return (this.isExistFront() && this.isExistRight())
            ? new CoordinateImpl(this.shiftRight(), this.shiftFront())
            : null

    }
    right(): Coordinate | null {
        return this.isExistRight()
            ? new CoordinateImpl(this.shiftRight(), this.y)
            : null
    }
    rightBehind(): Coordinate | null {
        return (this.isExistRight() && this.isExistBehind())
            ? new CoordinateImpl(this.shiftRight(), this.shiftBehind())
            : null

    }
    behind(): Coordinate | null {
        return (this.isExistBehind())
            ? new CoordinateImpl(this.x, this.shiftBehind())
            : null

    }
    leftBehind(): Coordinate | null {
        return (this.isExistLeft() && this.isExistBehind())
            ? new CoordinateImpl(this.shiftLeft(), this.shiftBehind())
            : null
    }

    private shiftLeft(): number {
        return this.x + 1
    }

    private shiftFront(): number {
        return this.y - 1
    }

    private shiftRight(): number {
        return this.x - 1
    }

    private shiftBehind(): number {
        return this.y + 1
    }

    private isExistLeft(): boolean {
        return this.shiftLeft() <= 9
    }

    private isExistFront(): boolean {
        return this.shiftFront() >= 1
    }

    private isExistRight(): boolean {
        return this.shiftRight() >= 1
    }

    private isExistBehind(): boolean {
        return this.shiftBehind() <= 9
    }

}

export function coordinate(x: number, y: number): Coordinate {
    return new CoordinateImpl(x, y)
}

export function fromId(id: string): Coordinate {
    const matches = id.match(/\d+/g);
    if (matches === null) {
        throw new Error(`入力されたidテキストが異常: ${id}`)
    }
    const x = parseInt(matches[0])
    const y = parseInt(matches[1])
    return coordinate(x, y)
}