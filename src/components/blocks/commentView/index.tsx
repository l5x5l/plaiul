import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import textStyle from "../../../style/textStyle";
import { CommentDto } from "../../../type/DTO/commentDto";
import { RecommentView } from "../reCommentView/RecommentView";

export declare type CommentViewType = {
    Comment: CommentDto
}

const CommentView = (props: CommentViewType) => {

    const { colors } = useTheme()

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row", padding: 16 }}>
                <Image source={{ uri: props.Comment.user.profile }} style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: colors.card }} />
                <View style={{ flex: 1, marginStart: 8 }}>
                    <Text style={[textStyle.title2, { color: colors.text }]}>{props.Comment.user.nickname}</Text>
                    <Text style={[textStyle.body2, { color: colors.text, marginTop: 8 }]}>{props.Comment.content}</Text>
                    <View style={{ flexDirection: "row", marginTop: 8 }}>
                        <Text style={[textStyle.body3, { color: colors.text }]}>{props.Comment.createdAt}</Text>
                        <Pressable style={{ paddingHorizontal: 16 }}>
                            <Text style={[textStyle.body3, { color: colors.text, marginStart: 16 }]}>답글</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            {
                props.Comment.reComments.map((reply) => (
                    <RecommentView recomment={reply} key={`${props.Comment.commentIdx}_reple${reply.commentIdx}`}/>
                ))
            }
        </View>

    )
}

export {CommentView}