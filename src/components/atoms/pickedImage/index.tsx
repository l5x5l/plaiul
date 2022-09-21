import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, View } from "react-native";

export declare type PickedImageProps = {
    imageUri: string,
    onDelete: ((index: number) => void),
    index: number
}

const PickedImage = (props: PickedImageProps) => {
    const { colors } = useTheme()

    return (
        <View style={{ marginStart: 8 }}>
            <Image source={{ uri: props.imageUri }} style={{ height: 80, width: 80 }} />
            <Pressable style={{ position: "absolute", top: 0, right: 0 }} onPress={() => { props.onDelete(props.index) }}>
                <View style={{padding : 4, backgroundColor : colors.card}}>
                    <Image source={require("../../../assets/images/cancel_24.png")} style={{ tintColor: colors.border, height: 18, width: 18 }} />
                </View>
            </Pressable>
        </View>
    )
}

export { PickedImage }