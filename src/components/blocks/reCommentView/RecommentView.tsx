import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import textStyle from "../../../style/textStyle";
import { RecommentDto } from "../../../type/DTO/reCommentDto";

export declare type RecommentViewProps = {
    recomment: RecommentDto
}

const RecommentView = (props: RecommentViewProps) => {
    const { colors } = useTheme()

    return (
        <View style={{ flex: 1, paddingBottom: 16, flexDirection : "row", paddingHorizontal : 20 }}>
            <View style={{ height: 40, width: 40 }}></View>
            <View style={{ flex: 1, marginStart: 8 }}>
                <Text style={[textStyle.title2, { color: colors.text }]}>{props.recomment.user.nickname}</Text>
                <Text style={[textStyle.body2, { color: colors.text, marginTop: 8 }]}>{props.recomment.content}</Text>
                <View style={{ flexDirection: "row", marginTop: 8 }}>
                    <Text style={[textStyle.body3, { color: colors.text }]}>{props.recomment.createdAt}</Text>
                </View>
            </View>
        </View>
    )
}

export { RecommentView }