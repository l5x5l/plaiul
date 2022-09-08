import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Pressable } from "react-native";

export declare type CheckBoxProps = {
    style: "stroke" | "fill",
    isChecked: boolean,
    setIsChecked: (isChecked: boolean) => void
}

const CheckBox = (props: CheckBoxProps) => {

    const {colors} = useTheme();

    return (
        <Pressable onPress={() => {
            props.setIsChecked(!props.isChecked)
        }}>
            <Image source={
                props.style==="fill" ?
                     require("../../../assets/images/checkbox_fill_40.png")
                    : require("../../../assets/images/checkbox_stroke_40.png")} 
                    style={{ height: 30, width: 30, tintColor : props.isChecked ? colors.border : colors.card }} />
        </Pressable>
    )

}

export { CheckBox }