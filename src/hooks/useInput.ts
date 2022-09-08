import React, { useCallback, useState } from "react"

export declare type textInputOptions = {
    initialValue?: string,
    regex?: RegExp
}

const useTextInput = (option: textInputOptions) => {
    // const temp = /\d{3}-\d{4}-\d{4}/;

    const {
        initialValue = "",
        regex
    } = option || {}

    const [text, setText] = useState(initialValue)
    const [isError, setIsError] = useState(true)

    const handleText = useCallback((inputText: string) => {
        if (regex) {
            if (regex.test(inputText) && isError) { // 정규식과 일치하고, 에러처리가 되어있던 경우
                setIsError(false)
            } else if ( !regex.test(inputText) && !isError ){ // 정규식에 어긋나고, 에러처리가 안되어있던 경우
                setIsError(true)
            }
        }
        setText(inputText)
    }, [regex])

    const onChangeInputText = useCallback((text: string) => {
        handleText(text)
    }, [handleText])

    return {text, onChangeInputText, isError}
}

export {useTextInput}