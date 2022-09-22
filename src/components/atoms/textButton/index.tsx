import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, Text } from "react-native";
import textStyle from "../../../style/textStyle";

export declare type TextButtonProps = {
    text : string,
    onPress : () => void,
    paddingVertical ?: number
}

const TextButton = (props : TextButtonProps) => {
    const {colors} = useTheme();

    return (
        <Pressable onPress={() => {props.onPress()}}>
            <Text style={[textStyle.body1, {color : colors.text,paddingVertical : props.paddingVertical ? props.paddingVertical : 8, width : "100%"}]}>{props.text}</Text>
        </Pressable>
    )
}

export {TextButton}