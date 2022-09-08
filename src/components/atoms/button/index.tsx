import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, Text } from "react-native";
import textStyle from "../../../style/textStyle";

export declare type styledButtonProps = {
    onClick: () => void,
    style: "stroke" | "background",
    text: string,
    marginTop?: number,
    marginBottom?: number,
    width?: number | string,
    height?: number | string,
    paddingHorizon?: number,
    paddingVertical?: number,
    enable?: boolean
}

const StyledButton = (props: styledButtonProps) => {

    const { colors } = useTheme()

    const customStyle = (props.style === "background") ? {
        backgroundColor: (props.enable === undefined || props.enable === true) ? colors.border : colors.card,
        color: colors.background
    } : {
        borderColor: (props.enable === undefined || props.enable === true) ? colors.border : colors.card,
        color: (props.enable === undefined || props.enable === true) ? colors.text : colors.card,
        borderWidth: 1
    }

    return (
        <Pressable onPress={() => {
            if (props.enable === undefined || props.enable === true) {
                props.onClick()
            }
        }}>
            <Text style={[customStyle, textStyle.title1, { width: props.width, height: props.height, marginBottom: props.marginBottom, marginTop: props.marginTop, paddingVertical: props.paddingVertical ? props.paddingVertical : 12, textAlignVertical: "center", textAlign: "center", paddingHorizontal: props.paddingHorizon }]}>{props.text}</Text>
        </Pressable>
    )
}

export { StyledButton }