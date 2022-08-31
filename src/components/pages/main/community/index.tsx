import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import textStyle from "../../../../style/textStyle";
import { PostDto } from "../../../../type/DTO/postDto";
import { RootStackParamList } from "../../../../type/navigate/types";
import { Line } from "../../../atoms/line";
import { SelectButton } from "../../../atoms/selectButton";
import { PostView } from "../../../blocks/postView";

export declare type CommunityScreenProps = {
    navigation : NativeStackNavigationProp<RootStackParamList, "Main", undefined>
}

const CommunityScreen = (props : CommunityScreenProps) => {

    const { colors } = useTheme()
    const [selectedCategory, setSelectedCategory] = useState<"story" | "qna">("story")
    const [postList, setPostList] = useState<PostDto[]>([])
    const pageIdx = useRef(0);

    function getDatas(postIdx : number) : PostDto[] {
        return [
            {
                storyIdx : postIdx,
                content : "위 사진은 react 아이콘이에요",
                title : `${postIdx} 스토리입니다.`,
                thumbnail : "https://reactnative.dev/img/tiny_logo.png",
                user : {
                    userIdx : 0,
                    nickname : "probe"
                }
            },
            {
                storyIdx : postIdx + 1,
                content : "위 사진은 react 아이콘이에요",
                title : `${postIdx} 스토리입니다.`,
                thumbnail : "https://reactnative.dev/img/tiny_logo.png",
                user : {
                    userIdx : 0,
                    nickname : "probe"
                }
            },
            {
                qnaIdx : postIdx + 2,
                content : "위 사진은 react 아이콘이에요 이건 조금만 더 길게 적어볼께요. 여기서 더 적으면....?",
                title : `${postIdx} Qna입니다.`,
                thumbnail : "https://reactnative.dev/img/tiny_logo.png",
                user : {
                    userIdx : 0,
                    nickname : "probe"
                }
            },
            {
                qnaIdx : postIdx + 3,
                content : "위 사진은 react 아이콘이에요",
                title : `${postIdx} Qna입니다.`,
                thumbnail : "https://reactnative.dev/img/tiny_logo.png",
                user : {
                    userIdx : 0,
                    nickname : "probe"
                }
            },
            {
                storyIdx : postIdx + 4,
                content : "위 사진은 react 아이콘이에요",
                title : `${postIdx} 스토리입니다.`,
                thumbnail : "https://reactnative.dev/img/tiny_logo.png",
                user : {
                    userIdx : 0,
                    nickname : "probe"
                }
            },
            {
                qnaIdx : postIdx + 5,
                content : "위 사진은 react 아이콘이에요",
                title : `${postIdx} Qna입니다.`,
                thumbnail : "https://reactnative.dev/img/tiny_logo.png",
                user : {
                    userIdx : 0,
                    nickname : "probe"
                }
            }
        ]
    }
    
    function setData() {
        pageIdx.current = pageIdx.current + 6
        const response = getDatas(pageIdx.current)
        setPostList([...postList, ...response])
    }
    useEffect ( () => {
        setData()
    }
    , [])

    return (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <Text style={[textStyle.headline2, { color: colors.text }]}>Community</Text>
            {
                useMemo(() =>
                    <View style={CommunityStyle.categoryButtonArea}>
                        <SelectButton isSelected={selectedCategory === "story"} text={"story"} marginStart={0} onPress={function (): void {
                            setSelectedCategory("story")
                        }} />
                        <SelectButton isSelected={selectedCategory === "qna"} text={"qna"} marginStart={8} onPress={function (): void {
                            setSelectedCategory("qna")
                        }} />
                    </View>
                    , [selectedCategory])
            }
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24, alignItems: "center" }}>
                <Text style={[textStyle.body2, { color: colors.text }]}>{`총 검색결과 : ${6}개`}</Text>
                <Pressable>
                    <View style={{ padding: 8 }}>
                        <Text style={[textStyle.body3, { color: colors.text }]}>최신순</Text>
                    </View>
                </Pressable>
            </View>
            <Line marginTop={8} />
            <FlatList keyExtractor={item => (item.storyIdx === undefined) ? `community_qna_${item.qnaIdx}`: `community_story_${item.storyIdx}`} numColumns={2} data={postList} renderItem={({ item }) => <PostView post={item} onClick={(idx : number) => {
                props.navigation.push("Story", {storyIdx : idx})
            }}/>}
                onEndReachedThreshold={0.8}
                onEndReached={() => { setData()}} />
        </View>
    )
}

const CommunityStyle = StyleSheet.create({
    categoryButtonArea: {
        flexDirection: "row",
        marginTop: 24
    }
})

export { CommunityScreen }