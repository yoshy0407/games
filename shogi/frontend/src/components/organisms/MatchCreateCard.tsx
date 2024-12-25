import { useRef } from "react";
import MatchCard from "../atoms/MatchCard";
import ConfirmModal, { ConfirmModalMethod } from "../molecules/ConfirmModal";

export interface MatchCreateCardProps {
    gameId: string
    handleDeleteGameClick: () => void
}

export default function MatchCreateCard(props: MatchCreateCardProps) {
    const modalRef = useRef<ConfirmModalMethod>(null)

    return (
        <>
            <MatchCard>
                <p>ゲームを作成しました。<br />
                    対戦相手のユーザにこのIDを通知してください</p>
                <div className="grid justify-items-center">
                    <h2 className="font-bold text-lg">{props.gameId}</h2>
                </div>
                <p>相手が参加するのを待ってください</p>

                <div className="card-actions justify-end">
                    <button className="btn btn-secondary btn-xs" onClick={() => modalRef.current?.show()}>ゲームを破棄する</button>
                </div>
            </MatchCard >
            <ConfirmModal handleOk={() => props.handleDeleteGameClick()} ref={modalRef}>
                <p>ゲームを削除して、待機を終了します。<br />本当に良いですか？</p>
            </ConfirmModal>
        </>
    )
}