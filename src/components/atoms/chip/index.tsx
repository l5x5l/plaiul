import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import textStyle from "../../../style/textStyle";

export declare type ChipProps = {
    text : string,
    index : number,
    onDelete : (index : number) => void
}

const Chip = (props : ChipProps) => {
    const {colors} = useTheme()

    return (
        <View style={{flexDirection : "row", padding : 8, borderColor : colors.border, borderWidth : 1, alignItems : "center", marginEnd : 8}}>
            <Text style={[textStyle.caption, {color : colors.text, marginEnd : 4}]}>{props.text}</Text>
            <Pressable onPress={() => {props.onDelete(props.index)}}>
                <Image source={require("../../../assets/images/cancel_24.png")} style={{height : 12, width : 12, padding : 4, tintColor : colors.border}}/>
            </Pressable>
        </View>
    )
}

export {Chip}