import React from "react";
import { Image } from "react-native";

export declare type LeafProps = {
    isSelected: boolean,
    color : string
}

const Leaf = (props: LeafProps) => {
    if (props.isSelected) {
        return (
            <Image source={require("../../../assets/images/leaf.png")} style={{tintColor : props.color}} />
        )
    } else {
        return <Image source={require("../../../assets/images/leaf_stroke.png")} style={{tintColor : props.color}}/>
    }
}

export { Leaf }