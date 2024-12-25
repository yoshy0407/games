'use client'
import { BLACK_TEXT_CLASS, Pieces } from "@/domain/Pieces"
import Piece from "../atoms/Piece";
import '../../styles/shogi.css'
import { ClassNameSupport } from "@/utils/ClassNameSupport";

export interface HavingBoardProps {
    pieceList: Pieces[];
    reverse?: boolean;
    playerId: string;
}

const classnames = new ClassNameSupport(
    ['grid', 'grid-cols-3', 'gap-3', 'min-h-48', 'w-72', 'justify-items-center', 'content-center', 'bg-board', 'border-2', 'border-black', 'border-collapse', 'shadow-2xl'])


export default function HavingBoard(props: HavingBoardProps) {

    const support = props.reverse ? classnames.add('rotate-180') : classnames

    return (
        <div className={support.toClassString()}>
            {props.pieceList.map((p) => {
                return (
                    <div key={p.pieceId} className="py-2">
                        <Piece pieceId={p.pieceId} reverse={p.reverse(props.playerId)} textColor={BLACK_TEXT_CLASS}>{p.displayName}</Piece>
                    </div>
                )
            })}
        </div>
    )
}