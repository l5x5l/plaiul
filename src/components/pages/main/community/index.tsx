import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LoginSlice from "../../../../redux/login/loginSlice";
import { rootDispatch, rootState, store } from "../../../../redux/store";
import postListSlice, { loadPostList, postListSliceState } from "../../../../redux/story/postListSlice";
import textStyle from "../../../../style/textStyle";
import { RootStackParamList } from "../../../../type/navigate/types";
import { checkIsLogin } from "../../../../util/token";
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
    const loginAction = LoginSlice.actions

    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        setData()
    }, [postListInfo.category])

    function setData() {
        if (!postListInfo.isLast) {
            dispatch(loadPostList({ cursor: postListInfo.cursor, sort: postListInfo.sort, category: postListInfo.category }))
        }
    }

    const refreshList = () => {
        store.dispatch(action.clear())
        dispatch(loadPostList({ cursor: undefined, sort: postListInfo.sort, category: postListInfo.category }))
        setIsRefresh(false)
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <Text style={[textStyle.headline2, { color: colors.text }]}>Community</Text>
            {
                useMemo(() =>
                    <View style={CommunityStyle.categoryButtonArea}>
                        <SelectButton isSelected={postListInfo.category === "story"} text={"story"} marginStart={0} onPress={() => {
                            dispatch(action.switchCategory("story"))
                            // setData() ??? ????????? ??????????????? ????????????, ?????? ??? ???????????? postListInfo.category ??? ????????? ????????? dispatch ????????? 
                            // ???????????? ?????????.
                            // ??? ????????? ????????? ???????????? re rendering ??? ??????, ????????? ???????????? ???????????? ??? ??????.
                            // ????????? dispatch ??? ????????? ????????? ????????????????????? ????????? ????????? ?????? ??????????????? ?????????...
                        }} />
                        <SelectButton isSelected={postListInfo.category === "qna"} text={"qna"} marginStart={8} onPress={function (): void {
                            dispatch(action.switchCategory("qna"))
                        }} />
                    </View>
                    , [postListInfo.category])
            }
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24, alignItems: "center" }}>
                <Text style={[textStyle.body2, { color: colors.text }]}>{`??? ???????????? : ${postListInfo.data.length}???`}</Text>
                <Pressable>
                    <View style={{ padding: 8 }}>
                        <Text style={[textStyle.body3, { color: colors.text }]}>{postListInfo.sort}</Text>
                    </View>
                </Pressable>
            </View>
            <Line marginTop={8} />
            {
                postListInfo.category === "story" ?
                    <FlatList key={"story_flatlist"} keyExtractor={item => (item.storyIdx === undefined) ? `qna_${item.qnaIdx}` : `story_${item.storyIdx}`} numColumns={2} data={postListInfo.data} renderItem={({ item }) => <PostView post={item} onClick={(idx: number) => {
                        props.navigation.push("Story", { storyIdx: idx })
                    }} />}
                        onEndReachedThreshold={0.8}
                        onEndReached={() => { setData() }} refreshing={isRefresh} onRefresh={() => { refreshList() }} />
                    :

                    <FlatList key={"qna_flatlist"} keyExtractor={item => (item.storyIdx === undefined) ? `qna_${item.qnaIdx}` : `story_${item.storyIdx}`} numColumns={1} data={postListInfo.data} renderItem={({ item }) => <PostView post={item} onClick={(idx: number) => {
                        if (postListInfo.category === "story")
                            props.navigation.push("Story", { storyIdx: idx })
                        else
                            props.navigation.push("Qna", {qnaIdx : idx})
                    }} />}
                        onEndReachedThreshold={0.8}
                        onEndReached={() => { setData() }} refreshing={isRefresh} onRefresh={() => { refreshList() }} />

            }
            <Pressable style={{ position: "absolute", bottom: 16, right: 16 }} onPress={async () => {
                const isLogin = await checkIsLogin()
                if (isLogin) {
                    if (postListInfo.category === "story")
                        props.navigation.push("StoryEdit", {})
                    else 
                        props.navigation.push("QnaEdit", {})
                } else {
                    dispatch(loginAction.callBottomSheet())
                }
            }}>
                <View style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: colors.card, alignItems: "center", justifyContent: "center" }}>
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