import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import textStyle from "../../../style/textStyle";
import { PostDto } from "../../../type/DTO/postDto";

export declare type PostViewProps = {
    post: PostDto,
    onClick?: (idx: number) => void
}

const PostView = (props: PostViewProps) => {
    const { colors } = useTheme()

    const clickItem = () => {
        const postIdx = (props.post.storyIdx === undefined) ? props.post.qnaIdx : props.post.storyIdx
        if (props.onClick !== undefined) {
            props.onClick!!(postIdx!!)
        }
    }

    return (
        useMemo(() =>
            props.post.storyIdx ?
            <Pressable style={{ flex: 0.5 }} onPress={clickItem}>
                <View style={[PostViewStyle.container,{marginHorizontal: 2, marginTop: 16, borderColor: colors.border, borderWidth: 2}]}>
                    <Image source={{ uri: props.post.thumbnail }} style={PostViewStyle.thumbNail} />
                    <View style={PostViewStyle.textArea}>
                        <Text style={[textStyle.title2, { color: colors.text }]} numberOfLines={1}>{props.post.title}</Text>
                        <Text style={[textStyle.body3, { color: colors.text, marginTop: 8 }]} numberOfLines={2}>{props.post.content + "\n"}</Text>
                        <Text style={[textStyle.body3, { color: colors.text, marginTop: 8 }]} numberOfLines={1}>{props.post.user?.nickname}</Text>
                    </View>
                </View>
            </Pressable>
            :
            <Pressable style={{ flex: 1, minHeight : 80 }} onPress={clickItem}>
                <View style={[PostViewStyle.container,{marginHorizontal: 2, marginTop: 16, borderColor: colors.border, borderWidth: 2}]}>
                    <View style={PostViewStyle.textArea}>
                        <Text style={[textStyle.title2, { color: colors.text }]} numberOfLines={1}>{props.post.title}</Text>
                        <Text style={[textStyle.body3, { color: colors.text, marginTop: 8 }]} numberOfLines={2}>{props.post.content + "\n"}</Text>
                        <Text style={[textStyle.body3, { color: colors.text, marginTop: 8 }]} numberOfLines={1}>{props.post.user?.nickname}</Text>
                    </View>
                </View>
            </Pressable>
            , [])
    )
}

const PostViewStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    thumbNail: {
        width: "100%",
        aspectRatio: 1
    },
    textArea: {
        padding: 8,
        flex: 1
    }
})

export default React.memo(PostView)