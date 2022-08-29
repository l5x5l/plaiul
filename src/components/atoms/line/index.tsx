import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

export declare type LineProps = {
    marginTop? : number,
    marginBottom? : number
}

const Line = (props : LineProps) => {

    const marginTop = (props.marginTop !== undefined) ? props.marginTop : 0;
    const marginBottom = (props.marginBottom !== undefined) ? props.marginBottom : 0;
    const {colors} = useTheme()

    return (
        <View style={{backgroundColor : colors.border, width : "100%", height : 1, marginTop : marginTop, marginBottom : marginBottom}}></View>
    )
}

export {Line}