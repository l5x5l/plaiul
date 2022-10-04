import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, Text } from "react-native";
import textStyle from "../../../style/textStyle";
import { deactiveColor } from "../../../type/theme";

export declare type TextButtonProps = {
    text: string,
    onPress: () => void,
    paddingVertical?: number,
    enable?: boolean
}

const TextButton = (props: TextButtonProps) => {
    const { colors } = useTheme();

    return (
        <Pressable onPress={() => {
            if (!(props.enable !== undefined && props.enable === false))
                props.onPress()
        }}>
            <Text style={[textStyle.body1, { color: props.enable ? colors.text : deactiveColor , paddingVertical: props.paddingVertical ? props.paddingVertical : 8, width: "100%" }]}>{props.text}</Text>
        </Pressable>
    )
}

export { TextButton }