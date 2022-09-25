import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { postStoryCommentResult, postWriteStoryComment } from "../../../api/stories";
import commentSlice, { commentSliceState, loadCommentList } from "../../../redux/comment/commentSlice";
import LoginSlice from "../../../redux/login/loginSlice";
import { rootDispatch, rootState, store } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { storyCommentScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { checkIsLogin } from "../../../util/token";
import { BackButton } from "../../atoms/backButton";
import { Line } from "../../atoms/line";
import { CommentView } from "../../blocks/commentView";

const StoryCommentScreen = ({ route, navigation }: storyCommentScreenProps) => {
    const { colors, dark } = useTheme()

    const dispatch = useDispatch<rootDispatch>()
    const commentListInfo = useSelector<rootState, commentSliceState>(state => state.commentList)
    const action = commentSlice.actions
    const loginAction = LoginSlice.actions

    const [writingComment, setWritingComment] = useState("")
    const [isRefresh, setIsRefresh] = useState(false)

    function setData() {
        if (!commentListInfo.isLast) {
            dispatch(loadCommentList({ postIdx: route.params.storyIdx, cursor: commentListInfo.cursor, category : "story"}))
        }
    }

    async function sendComment() {
        const result = await callNeedLoginApi<postStoryCommentResult, any>(() => postWriteStoryComment(writingComment, route.params.storyIdx, commentListInfo.targetRepltIdx))
        if (result?.data) {
            setWritingComment("")
            refresh()
        }
    }

    function refresh() {
        store.dispatch(action.clear())
        dispatch(loadCommentList({postIdx : route.params.storyIdx, cursor : undefined, category : "story"}))
        setIsRefresh(false)
    }

    useEffect(() => {
        store.dispatch(action.clear())
        store.dispatch(action.setPostType("story"))
        store.dispatch(action.setBasePost(route.params.storyIdx))
        setData()

        return () => {
            store.dispatch(action.clear())
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <BackButton margin={4} onPress={() => {
                    store.dispatch(action.clear())
                    navigation.goBack()
                }} />
                <FlatList keyExtractor={item => `${commentListInfo.postIdx}_comment${item.commentIdx}`} style={{ flex: 1 }} data={commentListInfo.data} renderItem={({ item }) => <CommentView Comment={item} />}
                    onEndReachedThreshold={0.8} onEndReached={() => { setData() }} onRefresh={() => {refresh()}} refreshing={isRefresh}
                />
                <View>
                    <Line />
                    <View style={{ flexDirection: "row", padding: 8, borderColor: colors.border, borderWidth: 1 }}>
                        <TextInput style={{ flex: 1, height: 40, backgroundColor: dark ? "#F3F0EB" : "#E8EDEB" }} value={writingComment} onChangeText={setWritingComment} />
                        <Pressable style={{ height: 40 }} onPress={async () => {
                            const isLogin = await checkIsLogin()
                            if (isLogin) {
                                sendComment()
                            } else {
                                dispatch(loginAction.callBottomSheet())
                            }
                            
                        }}>
                            <View style={{ backgroundColor: colors.border, flex : 1, alignItems : "center", justifyContent : "center" }}>
                                <Text style={[{ paddingHorizontal: 16, color: colors.background }, textStyle.body2]}>등록</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export { StoryCommentScreen }