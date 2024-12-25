import { ClassNameSupport } from "@/utils/ClassNameSupport"
import { useMemo, useState } from "react"

const classnameSupport = new ClassNameSupport(["loading", "loading-dots", "loading-md"])

export interface LoadingProps {
    hidden?: boolean
}

export default function Loading(props: LoadingProps) {

    let classSupport = classnameSupport
    if (props.hidden) {
        classSupport = classSupport.add("hidden")
    }

    return (
        <span className={classSupport.toClassString()}></span>
    )
}