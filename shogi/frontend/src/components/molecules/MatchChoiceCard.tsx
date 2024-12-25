import Image from "next/image";
import MatchCard from "../atoms/MatchCard";

export interface MatchChoiceCardProps {
    handleClick: () => void
}

export default function MatchChoiceCard(props: MatchChoiceCardProps) {
    return (
        <MatchCard handleClick={props.handleClick}>
            <p>事前に決めたユーザと対戦します。</p>

        </MatchCard>
    )
}