import { DndContext, DragEndEvent } from "@dnd-kit/core";
import HavingBoard from "../molecules/HavingBoard";
import { useRef, useState } from "react";
import Board, { BoardMethod } from "../molecules/Board";
import { Coordinate, fromId } from "@/domain/squares/Coordinate";
import { Pieces } from "@/domain/Pieces";
import { Boards, initBoard } from "@/domain/squares/Boards";
import EvolutionModal, { EvolutionModalMethod } from "../molecules/EvolutionModal";


export interface GameBoardProps {
    playerId: string;
    againstPlayerId: string;
    myTurn: boolean
}

interface EvolutionModalModel {
    currentCoordinate: Coordinate
    targetCoordinate: Coordinate
    pieceName: string
}

//成るのが動いていない？
export default function GameBoard(props: GameBoardProps) {

    const [againstHaving, setAgainstHaving] = useState<Pieces[]>([])
    const [selfHaving, setSelfHaving] = useState<Pieces[]>([])
    const [boards, setBoards] = useState(initBoard(props.playerId, props.againstPlayerId))
    const [evolutionModel, setEvolutionModel] = useState<EvolutionModalModel | null>(null)
    const evoModalRef = useRef<EvolutionModalMethod>(null);

    const boardRef = useRef<BoardMethod>(null)

    const setState = (boardDomain: Boards) => {
        setBoards(boardDomain.getSquares())
        setSelfHaving(boardDomain.getSelfHaving())
    }

    const handleOnDragEnd = (e: DragEndEvent) => {

        //自分のターン以外は動かない
        if (!props.myTurn) {
            return
        }

        const boardDomain = new Boards(boards, selfHaving)

        //移動させた先オブジェクトのDNDのオブジェクト
        const over = e.over
        if (over === null) {
            //ここに入ってくるのは変です
            return
        }

        // 移動させたコマの情報を特定
        const pieceId = e.active.id.toString()
        const currentCoordinate = boardDomain.search(pieceId)

        console.log(`selfHaving: ${JSON.stringify(selfHaving)}`)

        //ボードから駒が動かされた場合を想定
        //その場合、元の座標がわかる
        if (currentCoordinate !== null) {

            //移動先を特定する
            let targetCoordinate = fromId(over.id.toString())

            if (targetCoordinate === undefined) {
                throw new Error("ここに入ってくるのはおかしい")
            }

            //なる場合モーダルを表示させて終了する
            if (boardDomain.isMoveEvolution(props.playerId, currentCoordinate, targetCoordinate)) {

                const piece = boardDomain.getSquare(currentCoordinate).getPiece()

                if (piece !== undefined) {
                    setEvolutionModel({
                        currentCoordinate,
                        targetCoordinate,
                        pieceName: piece.displayName
                    })

                    evoModalRef.current?.show()
                    return
                }
            } else {
                //コマの移動処理
                boardDomain.move(props.playerId, currentCoordinate, targetCoordinate, false)
            }


            // 取った駒から動かしている場合を想定
        } else {

            //移動先を特定する
            let targetCoordinate = fromId(over.id.toString())

            //移動させた駒を特定
            const havingPiece = selfHaving.filter(p => p.pieceId === pieceId)
            if (havingPiece[0] === undefined) {
                throw new Error("ここに入ってくるのはおかしい")
            }

            const piece = havingPiece[0]
            const result = piece.verifyMove(currentCoordinate, targetCoordinate, boards)
            if (!result) {
                return
            }
            boardDomain.putPiece(props.playerId, targetCoordinate, piece, false)
        }
        setState(boardDomain)
        boardRef.current?.disableCanMoveDisplay()
    }

    //成るのを判定した後の処理
    const choiceEvolution = (result: boolean) => {
        const boardDomain = new Boards(boards, selfHaving)
        if (evolutionModel === null) {
            throw new Error("unexpected error evolution modal is null")
        }
        boardDomain.move(props.playerId, evolutionModel.currentCoordinate, evolutionModel?.targetCoordinate, result)
        setEvolutionModel(null)
        setState(boardDomain)
    }

    return (
        <>
            <DndContext onDragEnd={handleOnDragEnd}>
                <div className="flex">
                    <div className="flex-none content-start justify-items-start pr-4">
                        <HavingBoard reverse={true} pieceList={againstHaving} playerId={props.againstPlayerId} />
                    </div>
                    <div className="grow">
                        <Board playerId={props.playerId} myTurn={props.myTurn} boards={boards} ref={boardRef} />
                    </div>
                    <div className="flex-none content-end justify-items-end pl-4">
                        <HavingBoard pieceList={selfHaving} playerId={props.playerId} />
                    </div>
                </div>
            </DndContext>
            <EvolutionModal
                ref={evoModalRef}
                pieceName={evolutionModel === null ? "" : evolutionModel.pieceName}
                handleChoice={choiceEvolution}
            />
        </>
    )
}