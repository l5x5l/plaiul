import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { deleteQna, postQnaCommentResult, postWriteQnaComment } from "../../../api/qna";
import commentSlice, { commentSliceState, loadCommentList } from "../../../redux/comment/commentSlice";
import LoginSlice from "../../../redux/login/loginSlice";
import { rootDispatch, rootState } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { qnaScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { checkIsLogin } from "../../../util/token";
import { BackButton } from "../../atoms/backButton";
import { Line } from "../../atoms/line";
import { MoreButton } from "../../atoms/moreButton";
import { TextButton } from "../../atoms/textButton";
import { BottomSheet } from "../../blocks/bottomSheet";
import { CommentView } from "../../blocks/commentView";
import { ConfirmModal } from "../../blocks/confirmModal";
import { QnaView } from "../../blocks/qnaView";

const QnaScreen = ({ route, navigation }: qnaScreenProps) => {

    const { colors, dark } = useTheme()
    const [bottomSheetShow, setBottomSheetShow] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const commentListInfo = useSelector<rootState, commentSliceState>(state => state.commentList)
    const dispatch = useDispatch<rootDispatch>()
    const loginAction = LoginSlice.actions
    const commentAction = commentSlice.actions
    const isQnaWriter = useSelector<rootState, boolean>(state=> state.qna.value.isWriter)

    const [writingComment, setWritingComment] = useState("")
    
    useEffect(() => {
        dispatch(commentAction.setPostType("qna"))
        dispatch(commentAction.setBasePost(route.params.qnaIdx))
        setData()
        
        return () => {
            dispatch(commentAction.clear())
        }
    }, [])

    function setData() {
        if (!commentListInfo.isLast) {
            console.log(`${commentListInfo.cursor}`)
            dispatch(loadCommentList({ postIdx: route.params.qnaIdx, cursor: commentListInfo.cursor, category: "qna" }))
        }
    }

    async function sendComment() {
        const result = await callNeedLoginApi<postQnaCommentResult, any>(() => postWriteQnaComment(writingComment, route.params.qnaIdx, commentListInfo.targetRepltIdx))
        if (result?.data) {
            // refresh 구현 필요
            setWritingComment("")
        }
    }

    async function removeQna() {
        const response = await callNeedLoginApi(() => deleteQna(route.params.qnaIdx))
        if (response?.data?.deleted) {
            navigation.goBack()
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <BackButton margin={4} onPress={() => {
                        navigation.goBack()
                    }} />
                    <MoreButton margin={4} onPress={() => {
                        setBottomSheetShow(true)
                    }} />
                </View>
                <FlatList data={commentListInfo.data}
                    renderItem={({ item }) => <CommentView Comment={item} />}
                    ListHeaderComponent={
                        <QnaView qnaIdx={route.params.qnaIdx} />
                    }
                    onEndReachedThreshold={0.8} onEndReached={
                        () => { setData() }
                    } />

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
                            isQnaWriter ?
                                <View style={{ paddingHorizontal: 16 }}>
                                    <TextButton text={"수정하기"} onPress={() => {
                                        setBottomSheetShow(false)
                                        navigation.push("QnaEdit", {qnaIdx : route.params.qnaIdx})
                                    }} paddingVertical={16} />
                                    <Line />
                                    <TextButton text={"삭제하기"} onPress={() => {
                                        setBottomSheetShow(false)
                                        setModalShow(true)
                                    }} paddingVertical={16} />
                                </View> :
                                <View style={{ paddingHorizontal: 16 }}>
                                    <TextButton text={"신고하기"} onPress={() => { }} paddingVertical={16} />
                                    <Line />
                                    <TextButton text={"사용자 차단하기"} onPress={() => { }} paddingVertical={16} />
                                </View>
                        }
                    </View>
                } isShow={bottomSheetShow} setIsShow={setBottomSheetShow} />
            </View>
            <ConfirmModal mainText={"qna를\n삭제하시겠습니까?"} confirmButtonText={"삭제하기"} confirmCallback={async () => {
                removeQna()
            }} isShow={modalShow} setIsShow={setModalShow} />
        </SafeAreaView>
    )
}

export { QnaScreen }