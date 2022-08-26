import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";

const Logo = () => {
    const { colors } = useTheme();

    return (
        <Image style={{
            height: 40,
            width: 40,
            margin: 16,
            tintColor : colors.text
        }} source={require('../../../assets/images/plaiul_logo.png')} />
    )
}

export { Logo }