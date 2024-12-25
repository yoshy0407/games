import { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef } from "react";
import Loading from "../atoms/Loading";

export interface LoadingModalMethod {
    show: () => void
    close: () => void
}

export interface LoadingModalProps {
    open?: boolean
    children: ReactNode
}

const LoadingModal = forwardRef<LoadingModalMethod, LoadingModalProps>((props, ref) => {

    const dialogRef = useRef<HTMLDialogElement>(null);

    const showModal = () => {
        if (dialogRef.current === null) {
            throw new Error("target ref is null. cannot open modal")
        }
        dialogRef.current.showModal()
    }

    const closeModal = () => {
        if (dialogRef.current === null) {
            throw new Error("target ref is null. cannot open modal")
        }
        dialogRef.current.close()
    }

    useEffect(() => {
        if (props.open != undefined) {
            if (props.open) {
                showModal()
            } else {
                closeModal()
            }
        }
    }, [dialogRef])


    useImperativeHandle(ref, () => ({
        show() {
            showModal()
        },
        close() {
            closeModal()
        }
    }))

    return (
        <dialog id="loading_modal" className="modal" ref={dialogRef}>
            {/**
             * bg-whiteがないと背景と一緒に透過してしまう
             * ダークモードを入れる場合は、ここが白いままになってしまう
             */}
            <div className="card w-96 bg-white shadow-xl">
                <div className="card-body">
                    <div className="grid justify-items-center">
                        <Loading />
                        <h2 className="font-bold text-lg">ロード中</h2>
                    </div>
                    {props.children}
                </div>
            </div>
        </dialog>
    )
})

export default LoadingModal