import Image from "next/image";
import MatchCard from "../atoms/MatchCard";

export const CREATE_GAME = 1

export const JOIN_GAME = 2

export interface MatchSettingCardProps {
    handleClick: (choice: 1 | 2) => void
}

export default function MatchSettingCard(props: MatchSettingCardProps) {
    return (
        <MatchCard>
            <p>貴方がホストになり新しいゲームを作るか,<br />
                対戦相手のユーザがすでに作成したゲームに参加するか決めてください</p>
            <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={() => props.handleClick(CREATE_GAME)}>新しいゲームを作成する</button>
                <button className="btn btn-secondary" onClick={() => props.handleClick(JOIN_GAME)}>作成済みのゲームに参加する</button>
            </div>
        </MatchCard >
    )
}