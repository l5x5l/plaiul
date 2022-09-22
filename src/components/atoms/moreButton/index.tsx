import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Pressable } from "react-native";

export declare type MoreButtonProps = {
    onPress : () => void,
    margin? : number
}

const MoreButton = (props : MoreButtonProps) => {
    const {colors} = useTheme()

    return (
        <Pressable style={{padding : 12, margin : (props.margin === undefined) ? 0 : props.margin}} onPress={() => {props.onPress()}}>
            <Image style={{height : 24, width : 24, tintColor : colors.border}} source={require("../../../assets/images/more_dot_24.png")}/>
        </Pressable>
    )
}
export {MoreButton}