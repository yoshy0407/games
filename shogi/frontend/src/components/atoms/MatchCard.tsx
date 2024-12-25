import { ClassNameSupport } from "@/utils/ClassNameSupport";
import Image from "next/image";
import { ReactNode } from "react";

export interface MatchCardProps {
    handleClick?: () => void
    children: ReactNode
}

const classnameSupport = new ClassNameSupport(["card", "card-compact", "w-80", "bg-base-100", "shadow-xl"])

export default function MatchCard(props: MatchCardProps) {
    let support = props.handleClick !== undefined
        ? classnameSupport.add("hover:bg-accent")
        : classnameSupport

    const handleClick = () => {
        if (props.handleClick !== undefined) {
            props.handleClick()
        }
    }
    return (
        <div className={support.toClassString()} onClick={() => handleClick()}>
            <figure><Image src="/board_game.png" alt="matchImage" width="96" height="200" /></figure>
            <div className="card-body">
                <h2 className="card-title">対人戦</h2>
                {props.children}
            </div>
        </div>
    )
}