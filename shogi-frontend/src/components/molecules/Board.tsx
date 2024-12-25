'use client'
import { Squares } from '@/domain/squares/Squares'
import '../../styles/shogi.css'
import Square from './Square'
import { forwardRef, useImperativeHandle, useState } from 'react'
import Piece from '../atoms/Piece'
import { Pieces } from '@/domain/Pieces'
import { coordinate, Coordinate } from '@/domain/squares/Coordinate'
import { getIndexies } from '@/domain/squares/Boards'

export interface BoardProps {
    playerId: string;
    myTurn: boolean;
    boards: Squares[][]
}

export interface BoardMethod {
    disableCanMoveDisplay: () => void
}

const reverse = (a: number, b: number) => (a > b ? -1 : 1)


const Board = forwardRef<BoardMethod, BoardProps>((props, ref) => {
    const [diplayCanMove, setDisplayCanMove] = useState(false)

    const displayCanMove = (coordinate: Coordinate, pieces: Pieces | undefined) => {
        if (!props.myTurn) {
            return
        }
        if (pieces !== undefined) {
            const result = pieces.displayMove(props.playerId, coordinate, props.boards)
            if (result) {
                setDisplayCanMove(true)
            }
        }
    }

    const disableCanMove = () => {
        if (diplayCanMove) {
            props.boards.map(col => {
                col.map(s => {
                    s.canMove = false
                })
            })
            setDisplayCanMove(false)
        }
    }

    useImperativeHandle(ref, () => ({
        disableCanMoveDisplay() {
            disableCanMove()
        },
    }))

    return (
        <div className="shadow-2xl">
            <table className="bg-board border-2 border-black border-collapse border-solid shadow-xl">
                <tbody>
                    {
                        getIndexies().map(y => {
                            return (
                                <tr key={`${y}-col`}>
                                    {
                                        getIndexies().sort(reverse).map(x => {
                                            var square = props.boards[x][y]
                                            var piece = square.getPiece()
                                            var coord: Coordinate = coordinate(x, y)

                                            return (
                                                <Square key={`${x}-${y}-square`} canMove={square.canMove} disableColor={!props.myTurn} coordinate={coord}>
                                                    {piece !== undefined
                                                        ? <Piece
                                                            pieceId={piece.pieceId}
                                                            textColor={piece.fontColor}
                                                            reverse={piece.reverse(props.playerId)}
                                                            displayCanMove={() => displayCanMove(coord, piece)}
                                                            disableDisplayCanMove={() => disableCanMove()}
                                                        >
                                                            {square.getPiece()?.displayName}
                                                        </Piece>
                                                        : <></>}
                                                </Square>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
})

export default Board