import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Pressable } from "react-native";

export declare type BackButtoProps = {
    onPress : () => void,
    margin? : number
}

const BackButton = (props : BackButtoProps) => {

    const {colors} = useTheme()

    return (
        <Pressable style={{padding : 12, margin : (props.margin === undefined) ? 0 : props.margin}} onPress={() => {props.onPress()}}>
            <Image style={{height : 24, width : 24, tintColor : colors.border}} source={require("../../../assets/images/back_24.png")}/>
        </Pressable>
    )
}

export {BackButton}