import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import textStyle from "../../../style/textStyle";

export declare type SelectButtonProps = {
    isSelected: boolean,
    text: string,
    onPress: () => void,
    marginStart: number
}

const SelectButton = (props: SelectButtonProps) => {
    const { colors } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={() => {
            props.onPress()
        }}>
            <View style={{backgroundColor : colors.text, padding : 1, marginStart : props.marginStart}}>
                <Text style={[getStyle(colors.background, colors.text, props.isSelected)]}>{props.text}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const getStyle = (backgroundColor: string, textColor: string, isSelected: boolean) => {
    if (isSelected) {
        return [textStyle.title2, { color: backgroundColor, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: textColor }]
    } else {
        return [textStyle.title2, { color: textColor, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: backgroundColor}]
    }
}

export { SelectButton }