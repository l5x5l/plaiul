import React, { useRef, useState } from "react";

export declare type counterOptions = {
    startValue : number,   
}

const useCounter = (option : counterOptions) => {
    const {startValue} = option || {}

    const second = useRef(startValue)
    const [secondString, setSecondString] = useState("")
    let counter : number | undefined = undefined

    const startCounter = () => {
        counter = setInterval(() => {
            if (second.current > 0) {
                second.current -= 1
                setSecondString(`${(Math.floor(second.current / 60)).toString()}:${('0'+(second.current % 60).toString()).slice(-2)}`)
            }
        }, 1000)
    }

    const clearCounter = () => {
        cancelCounter()
        second.current = startValue
    }

    const cancelCounter = () => {
        if (counter !== undefined) {
            clearInterval(counter)
        }
    }

    return {secondString, startCounter, cancelCounter, clearCounter, secondNumber : second.current}
}
export {useCounter}