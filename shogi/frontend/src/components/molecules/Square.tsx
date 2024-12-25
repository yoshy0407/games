'use client'
import { Coordinate } from "@/domain/squares/Coordinate";
import { ClassNameSupport } from "@/utils/ClassNameSupport";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import React from "react"

export interface SquareProps {
    canMove: boolean;
    disableColor: boolean;
    coordinate: Coordinate;
    children?: React.ReactNode;
}


const classnames = new ClassNameSupport(['border-2', 'border-black', 'border-solid'])

export default function Square(props: SquareProps) {

    const { isOver, setNodeRef } = useDroppable({
        id: props.coordinate.toId()
    })

    var classSupport = props.canMove ? classnames.add("bg-green-300") : classnames.add("hover:bg-blue-300")
    if (!props.disableColor) {
        var classSupport = isOver && props.canMove ? classSupport.add("bg-green-400") : classSupport
    }

    return (
        <td className={classSupport.toClassString()} ref={setNodeRef}>
            <div className='size-16'>
                {props.children}
            </div>
        </td>
    )
}