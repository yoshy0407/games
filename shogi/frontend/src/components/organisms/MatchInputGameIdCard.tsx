import MatchCard from "../atoms/MatchCard";
import { useEffect, useRef, useState } from "react";
import { ClassNameSupport } from "@/utils/ClassNameSupport";
import verifyGameId from "@/domain/game/Games";
import { defaultVerify, VerifyResult } from "@/domain/verifys";
import LoadingModal, { LoadingModalMethod } from "../molecules/LoadingModal";


export const CREATE_GAME = 1

export const JOIN_GAME = 2

export interface MatchSettingCardProps {
    handleClick: (gameId: string) => void
}

const errorSupport = new ClassNameSupport(["label-text", "text-red-400"])
const buttonSupport = new ClassNameSupport(["btn", "btn-primary"])

export default function MatchSettingCard(props: MatchSettingCardProps) {

    const modalRef = useRef<LoadingModalMethod>(null)

    const [gameId, setGameId] = useState<string | null>(null);
    const [errors, setErrors] = useState<VerifyResult>(defaultVerify());

    let errorClassSupport = errors.isVerify ? errorSupport.add("hidden") : errorSupport
    let buttonClassSupport = errors.isVerify ? buttonSupport : buttonSupport.add("btn-disabled")

    const input = (value: string) => {
        const verify = verifyGameId(value)
        setErrors(verify)
        setGameId(value)
    }

    useEffect(() => {
        errorClassSupport = errors.isVerify ? errorSupport.add("hidden") : errorSupport
        buttonClassSupport = errors.isVerify ? buttonSupport : buttonSupport.add("btn-disabled")
    }, [errors])

    const join = () => {
        if (gameId === null) {
            setErrors({
                isVerify: false,
                message: "ゲームIDが未設定です"
            })
            return
        }

        props.handleClick(gameId)
        modalRef.current?.show()
    }

    return (
        <>
            <MatchCard>
                <p>対戦相手から共有されたゲームIDを入れてください</p>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className={errorClassSupport.toClassString()}>{errors.message}</span>
                    </div>
                    <input
                        type="text"
                        placeholder="ゲームIDを入れてください"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => input(e.target.value)}
                    />
                </label>
                <div className="card-actions justify-center">
                    <button className={buttonClassSupport.toClassString()} onClick={() => join()}>参加する</button>
                </div>
            </MatchCard >
            <LoadingModal ref={modalRef}>
                <p>ゲームに参加中です。お待ちください</p>
            </LoadingModal>
        </>
    )
}