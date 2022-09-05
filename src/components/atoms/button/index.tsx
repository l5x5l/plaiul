import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, Text } from "react-native";
import textStyle from "../../../style/textStyle";

export declare type styledButtonProps = {
    onClick : () => void,
    style : "stroke" | "background",
    text : string,
    marginTop? : number,
    marginBottom? : number,
    width? : number | string,
    height? : number | string,
    paddingHorizon ? : number,
    paddingVertical ?: number
}

const StyledButton = (props : styledButtonProps) => {

    const {colors} = useTheme()
    
    const customStyle = (props.style === "background") ? {
        backgroundColor : colors.border,
        color : colors.background
    } : {
        borderColor : colors.border,
        color : colors.text,
        borderWidth : 1
    }

    return (
        <Pressable onPress={props.onClick}>
            <Text style={[customStyle, textStyle.title1, {width : props.width, height : props.height, marginBottom : props.marginBottom, marginTop : props.marginTop, paddingVertical : props.paddingVertical ? props.paddingVertical : 12, textAlignVertical : "center", textAlign : "center", paddingHorizontal : props.paddingHorizon}]}>{props.text}</Text>
        </Pressable>
    )
}

export {StyledButton}