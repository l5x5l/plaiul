import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import textStyle from "../../../style/textStyle";
import { TipDto } from "../../../type/DTO/tipDto";


export declare type TipViewProps = {
    tip: TipDto,
    onClick?: (idx: number) => void
}


const onClick = () => {
    
}

const TipView = (props: TipViewProps) => {
    const { colors } = useTheme()

    return (
        useMemo(() =>
            <Pressable style={{ flex: 1, marginHorizontal: 16, marginBottom: 8, borderColor: colors.border, borderWidth: 2 }} onPress={onClick}>
                <View style={PostViewStyle.container}>
                    <Image source={{ uri: props.tip.thumbnail }} style={PostViewStyle.thumbNail} />
                    <View style={PostViewStyle.textArea}>
                        <View>
                            <Text style={[textStyle.title2, { color: colors.text }]} numberOfLines={1}>{props.tip.title}</Text>
                            <Text style={[textStyle.body3, { color: colors.text, marginTop: 8 }]} numberOfLines={2}>{props.tip.title}</Text>
                        </View>
                        <Text style={[textStyle.body3, { color: colors.text, marginTop: 8 }]} numberOfLines={1}>{props.tip.user?.nickname}</Text>
                    </View>
                </View>
            </Pressable>
            , [])
    )
}

const PostViewStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    thumbNail: {
        height: 128,
        width: 128
    },
    textArea: {
        padding: 16,
        flex: 1,
        justifyContent: "space-between"
    }
})

export { TipView }