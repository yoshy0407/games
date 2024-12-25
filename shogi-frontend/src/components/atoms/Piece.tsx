'use client'
import { ClassNameSupport } from '@/utils/ClassNameSupport';
import '../../styles/shogi.css'
import { MouseEventHandler } from 'react';
import { useDraggable } from '@dnd-kit/core';


export interface PieceProps {
    pieceId: string;
    children: React.ReactNode;
    textColor: string;
    reverse?: boolean;
    displayCanMove?: () => void
    disableDisplayCanMove?: () => void
}

const classnames = new ClassNameSupport(['rounded-xl', 'border-2', 'border-black', 'size-16', 'shadow-lg', 'bg-piece', 'grid', 'justify-center', 'content-center'])

/**
 * 駒コンポーネント
 * @returns 
 */
export default function Piece(props: PieceProps) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.pieceId
    })

    // 移動している間は、移動している位置にオブジェクトを移動させる
    const style = transform && !props.reverse ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    var classnameSupport = props.reverse ? classnames.add('rotate-180') : classnames
    var classnameSupport = classnameSupport.add(props.textColor)

    var classnameSupport = transform && !props.reverse ? classnameSupport.add('opacity-75') : classnameSupport;

    const enableCanMove = () => {
        if (props.displayCanMove !== undefined) {
            props.displayCanMove()
        }
    }

    const disableCanMove = () => {
        if (props.disableDisplayCanMove !== undefined) {
            props.disableDisplayCanMove()
        }
    }

    return (
        <div className={classnameSupport.toClassString()}
            onMouseDown={(e) => enableCanMove()}
            onMouseUp={(e) => disableCanMove()}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            <span className='text-5xl font-bold'> {props.children}</span>
        </ div>
    )
}