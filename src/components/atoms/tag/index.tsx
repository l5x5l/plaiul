import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import textStyle from "../../../style/textStyle";

export declare type TagButtonProps = {
    onPress : () => void,
    marginEnd : number,
    text : string
}

const TagButton = (props: TagButtonProps) => {
    const { colors } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={() => {
            props.onPress()
        }}>
            <View style={{backgroundColor : colors.text, padding : 1, marginEnd : props.marginEnd}}>
                <Text style={[getStyle(colors.background, colors.text)]}>{props.text}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const getStyle = (backgroundColor: string, textColor: string) => {
    return [textStyle.body3, { color: textColor, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: backgroundColor}]
}

export {TagButton}