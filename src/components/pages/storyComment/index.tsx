import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { deleteStoryComment, postStoryCommentResult, postWriteStoryComment } from "../../../api/stories";
import { postBlockUser } from "../../../api/user";
import commentSlice, { commentSliceState, loadCommentList } from "../../../redux/comment/commentSlice";
import LoginSlice from "../../../redux/login/loginSlice";
import { rootDispatch, rootState, store } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { storyCommentScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { checkIsLogin } from "../../../util/token";
import { BackButton } from "../../atoms/backButton";
import { Line } from "../../atoms/line";
import { TextButton } from "../../atoms/textButton";
import { BottomSheet } from "../../blocks/bottomSheet";
import { CommentView } from "../../blocks/commentView";
import { ConfirmModal } from "../../blocks/confirmModal";

const StoryCommentScreen = ({ route, navigation }: storyCommentScreenProps) => {
    const { colors, dark } = useTheme()

    const dispatch = useDispatch<rootDispatch>()
    const commentListInfo = useSelector<rootState, commentSliceState>(state => state.commentList)
    const action = commentSlice.actions
    const loginAction = LoginSlice.actions

    const [writingComment, setWritingComment] = useState("")
    const [isRefresh, setIsRefresh] = useState(false)
    const [bottomSheetShow, setBottomSheetShow] = useState(false)
    const [removeModalShow, setRemoveModalShow] = useState(false)
    const [blockModalShow, setBlockModalShow] = useState(false)

    function setData() {
        if (!commentListInfo.isLast) {
            dispatch(loadCommentList({ postIdx: route.params.storyIdx, cursor: commentListInfo.cursor, category: "story" }))
        }
    }

    async function sendComment() {
        const result = await callNeedLoginApi<postStoryCommentResult, any>(() => postWriteStoryComment(writingComment, route.params.storyIdx, commentListInfo.targetReplyIdx))
        if (result?.data) {
            setWritingComment("")
            refresh()
        }
    }

    function refresh() {
        store.dispatch(action.refresh())
        dispatch(loadCommentList({ postIdx: route.params.storyIdx, cursor: undefined, category: "story" }))
        setIsRefresh(false)
    }

    // comment 신고/수정에 관한 bottomSheet 의 표시 여부는 commentSlice 의 moreButtonTargetComment 의 유무에 따라 결정됩니다!
    useEffect(() => {
        setBottomSheetShow(commentListInfo.moreButtonTargetComment !== undefined)
    }, [commentListInfo.moreButtonTargetComment])

    useEffect(() => {
        store.dispatch(action.clear())
        store.dispatch(action.setPostType("story"))
        store.dispatch(action.setBasePost(route.params.storyIdx))
        setData()

        return () => {
            store.dispatch(action.clear())
            store.dispatch(action.setMoreButtonComment(undefined))
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <BackButton margin={4} onPress={() => {
                    navigation.goBack()
                }} />
                <FlatList keyExtractor={item => `${commentListInfo.postIdx}_comment${item.commentIdx}`} style={{ flex: 1 }} data={commentListInfo.data} renderItem={({ item }) => <CommentView Comment={item} />}
                    onEndReachedThreshold={0.8} onEndReached={() => { setData() }} onRefresh={() => { refresh() }} refreshing={isRefresh}
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
                            <View style={{ backgroundColor: colors.border, flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[{ paddingHorizontal: 16, color: colors.background }, textStyle.body2]}>등록</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={{ position: "absolute", bottom: 0, height: "100%" }}>
                <BottomSheet children={
                    <View style={{ width: "100%", paddingVertical: 40 }}>
                        {
                            (commentListInfo.moreButtonTargetComment?.isUserComment) ?
                                <View style={{ paddingHorizontal: 16 }}>
                                    <TextButton text={"삭제하기"} onPress={() => {
                                        setBottomSheetShow(false)
                                        setRemoveModalShow(true)
                                    }} paddingVertical={16} />
                                </View> :
                                <View style={{ paddingHorizontal: 16 }}>
                                    <TextButton text={"신고하기"} onPress={async () => {
                                        const isLogin = await checkIsLogin()
                                        if (isLogin) {
                                            setBottomSheetShow(false)
                                            navigation.push("Report", { targetIdx: route.params.storyIdx, category: "story", targetCommentIdx: commentListInfo.moreButtonTargetComment?.commentIdx })
                                        } else {
                                            dispatch(action.setMoreButtonComment(undefined))
                                            dispatch(loginAction.callBottomSheet())
                                        }
                                    }} paddingVertical={16} />
                                    <Line />
                                    <TextButton text={"사용자 차단하기"} onPress={async () => {
                                        const isLogin = await checkIsLogin()
                                        if (isLogin) {
                                            setBottomSheetShow(false)
                                            setBlockModalShow(true)
                                        } else {
                                            dispatch(action.setMoreButtonComment(undefined))
                                            dispatch(loginAction.callBottomSheet())
                                        }
                                     }} paddingVertical={16} />
                                </View>
                        }
                    </View>
                } isShow={bottomSheetShow} setIsShow={(isShow) => {
                    if (isShow) {
                        setBottomSheetShow(true)
                    } else {
                        dispatch(action.setMoreButtonComment(undefined))
                    }
                }} />
            </View>
            <ConfirmModal mainText={"댓글을\n삭제하시겠습니까?"} confirmButtonText={"삭제하기"} confirmCallback={async () => {
                if (commentListInfo.moreButtonTargetComment) {
                    const response = await callNeedLoginApi(() => deleteStoryComment(route.params.storyIdx, commentListInfo.moreButtonTargetComment!!.commentIdx))
                    
                    if (response?.data?.deleted) {
                        refresh()
                    }
                }
            }} isShow={removeModalShow} setIsShow={(isShow) => {
                if (!isShow) {
                    dispatch(action.setMoreButtonComment(undefined))
                }
                setRemoveModalShow(isShow)
            }} />

            <ConfirmModal mainText={`${commentListInfo.moreButtonTargetComment?.user.nickname}` + "님을\n차단하시겠습니까?"} confirmButtonText={"차단하기"} confirmCallback={async () => {
                if (commentListInfo.moreButtonTargetComment) {
                    const response = await callNeedLoginApi(() => postBlockUser(commentListInfo.moreButtonTargetComment!!.user.userIdx))

                    if (response?.data?.blocked) {
                        refresh()
                    }
                }
            }} isShow={blockModalShow} setIsShow={(isShow) => {
                if (!isShow) {
                    dispatch(action.setMoreButtonComment(undefined))
                }
                setBlockModalShow(isShow)
            }} />
        </SafeAreaView>
    )
}

export { StoryCommentScreen }