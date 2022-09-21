import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { rootDispatch, rootState, store } from "../../../../redux/store";
import postListSlice, { loadStoryList, postListSliceState } from "../../../../redux/story/postListSlice";
import textStyle from "../../../../style/textStyle";
import { RootStackParamList } from "../../../../type/navigate/types";
import { Line } from "../../../atoms/line";
import { SelectButton } from "../../../atoms/selectButton";
import PostView from "../../../blocks/postView";

export declare type CommunityScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Main", undefined>
}

const CommunityScreen = (props: CommunityScreenProps) => {

    const { colors } = useTheme()

    const dispatch = useDispatch<rootDispatch>()
    const postListInfo = useSelector<rootState, postListSliceState>(state => state.storyList)
    const action = postListSlice.actions

    function setData() {
        if (!postListInfo.isLast) {
            dispatch(loadStoryList({ cursor: postListInfo.cursor, sort: postListInfo.sort }))
        }
    }

    useEffect(() => {
        setData()
    }, [])

    return (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <Text style={[textStyle.headline2, { color: colors.text }]}>Community</Text>
            {
                useMemo(() =>
                    <View style={CommunityStyle.categoryButtonArea}>
                        <SelectButton isSelected={postListInfo.category === "story"} text={"story"} marginStart={0} onPress={function (): void {
                            store.dispatch(action.switchCategory("story"))
                            setData()
                        }} />
                        <SelectButton isSelected={postListInfo.category === "qna"} text={"qna"} marginStart={8} onPress={function (): void {
                            store.dispatch(action.switchCategory("qna"))
                            setData()
                        }} />
                    </View>
                    , [postListInfo.category])
            }
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24, alignItems: "center" }}>
                <Text style={[textStyle.body2, { color: colors.text }]}>{`총 검색결과 : ${postListInfo.data.length}개`}</Text>
                <Pressable>
                    <View style={{ padding: 8 }}>
                        <Text style={[textStyle.body3, { color: colors.text }]}>{postListInfo.sort}</Text>
                    </View>
                </Pressable>
            </View>
            <Line marginTop={8} />
            <FlatList keyExtractor={item => (item.storyIdx === undefined) ? `qna_${item.qnaIdx}` : `story_${item.storyIdx}`} numColumns={2} data={postListInfo.data} renderItem={({ item }) => <PostView post={item} onClick={(idx: number) => {
                props.navigation.push("Story", { storyIdx: idx })
            }} />}
                onEndReachedThreshold={0.8}
                onEndReached={() => { setData() }} />
            <Pressable style={{position : "absolute", bottom : 16, right : 16}} onPress={() => {
                props.navigation.push("StoryEdit", {})
            }}>
                <View style={{ height: 60, width: 60, borderRadius : 30,backgroundColor: colors.card, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[textStyle.headline1, { color: colors.text }]}>+</Text>
                </View>
            </Pressable>

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