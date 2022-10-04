import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { storyScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../style/textStyle";
import { ScrollView } from "react-native-gesture-handler";
import { Line } from "../../atoms/line";
import { TagButton } from "../../atoms/tag";
import { useDispatch, useSelector } from "react-redux";
import { rootDispatch, rootState } from "../../../redux/store";
import storySlice, { loadStory, storySliceState, toggleLike } from "../../../redux/story/storySlice";
import { MoreButton } from "../../atoms/moreButton";
import { BottomSheet } from "../../blocks/bottomSheet";
import { TextButton } from "../../atoms/textButton";
import { ConfirmModal } from "../../blocks/confirmModal";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { deleteStory } from "../../../api/stories";
import LoginSlice from "../../../redux/login/loginSlice";
import { checkIsLogin } from "../../../util/token";


const StoryScreen = ({ route, navigation }: storyScreenProps) => {
    const { colors } = useTheme();

    const dispatch = useDispatch<rootDispatch>()
    const story = useSelector<rootState, storySliceState>(state => state.story)
    const action = storySlice.actions
    const loginAction = LoginSlice.actions

    const [bottomSheetShow, setBottomSheetShow] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        dispatch(loadStory(route.params.storyIdx))

        return () => {
            dispatch(action.clear())
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <BackButton margin={4} onPress={() => {
                            navigation.goBack()
                        }} />
                        <MoreButton margin={4} onPress={() => {
                            setBottomSheetShow(true)
                        }} />
                    </View>

                    <Image style={{ width: "100%", aspectRatio: 1, backgroundColor: colors.card }} source={{ uri: (story.value.images && story.value.images.length >= 1) ? story.value.images[0] : undefined }} />
                    <View style={{ padding: 16 }}>
                        <Text style={[textStyle.headline1, { color: colors.text }]}>{(!story.isError) ? (story.value.title) : "에러입니다."}</Text>
                        <View style={StoryScreenStyle.profileArea}>
                            <Image style={[StoryScreenStyle.profile, { backgroundColor: colors.card }]} source={{ uri: story.value.user?.profile }}></Image>
                            <Text style={[textStyle.body2, { color: colors.text, marginStart: 8 }]}>{story.value.user.nickname}</Text>
                            <Text style={[textStyle.body2, { color: colors.text, marginStart: 16 }]}>{story.value.createdAt}</Text>
                        </View>
                        <Text style={[textStyle.body2, { marginTop: 24, color: colors.text }]}>{story.value.content}</Text>
                        <View style={{ flexDirection: "row", width: "100%", marginTop: 24, marginBottom: 24 }}>
                            {
                                story.value.tags.map((tag) => {
                                    return (<TagButton key={`tag_${tag}`} text={tag} onPress={() => { }} marginEnd={8} />)
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View>
                <Line />
                <View style={StoryScreenStyle.bottomArea}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Pressable style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14 }} onPress={() => {
                            navigation.push("StoryComment", { storyIdx: route.params.storyIdx })
                        }}>
                            <Image source={require("../../../assets/images/comment_28.png")} style={{ height: 28, width: 28, marginStart: 14, tintColor: colors.border }} resizeMode="center" />
                            <Text style={[textStyle.body2, { color: colors.text, marginStart: 4 }]}>{story.value.commentCnt}</Text>
                        </Pressable>
                        <Pressable style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14 }} onPress={async () => {
                            const isLogin = await checkIsLogin()
                            if (isLogin) {
                                dispatch(toggleLike(route.params.storyIdx))
                            } else {
                                dispatch(loginAction.callBottomSheet())
                            }
                        }}>
                            <Image source={(story.value.isLiked) ? require("../../../assets/images/heart_fill_28.png") : require("../../../assets/images/heart_stroke_28.png")} style={{ height: 28, width: 28, marginStart: 14, tintColor: colors.border }} />
                            <Text style={[textStyle.body2, { color: colors.text, marginStart: 4 }]}>{story.value.likeCnt}</Text>
                        </Pressable>
                    </View>
                    <Pressable style={{ padding: 14 }}>
                        <Image source={require("../../../assets/images/share_28.png")} style={{ height: 28, width: 28, tintColor: colors.border }} />
                    </Pressable>
                </View>
            </View>
            <View style={{ position: "absolute", bottom: 0, height: "100%" }}>
                <BottomSheet children={
                    <View style={{ width: "100%", paddingVertical: 40 }}>
                        {
                            (story.value.isWriter) ?
                                <View style={{ paddingHorizontal: 16 }}>
                                    <TextButton text={"수정하기"} onPress={() => {
                                        navigation.push("StoryEdit", { storyIdx: story.value.storyIdx })
                                        setBottomSheetShow(false)
                                    }} paddingVertical={16} />
                                    <Line />
                                    <TextButton text={"삭제하기"} onPress={() => {
                                        setBottomSheetShow(false)
                                        setModalShow(true)
                                    }} paddingVertical={16} />
                                </View> :
                                <View style={{ paddingHorizontal: 16 }}>
                                    <TextButton text={"신고하기"} onPress={async () => { 
                                        const isLogin = await checkIsLogin()
                                        if (isLogin) {
                                            setBottomSheetShow(false)
                                            navigation.push("Report", {targetIdx : route.params.storyIdx, category : "story"})
                                        } else {
                                            setBottomSheetShow(false)
                                            dispatch(loginAction.callBottomSheet())
                                        }
                                    }} paddingVertical={16} />
                                    <Line />
                                    <TextButton text={"사용자 차단하기"} onPress={() => {
                                        
                                     }} paddingVertical={16} />
                                </View>
                        }
                    </View>
                } isShow={bottomSheetShow} setIsShow={setBottomSheetShow} />
            </View>
            <ConfirmModal mainText={"스토리를\n삭제하시겠습니까?"} confirmButtonText={"삭제하기"} confirmCallback={async () => {
                const response = await callNeedLoginApi(() => deleteStory(route.params.storyIdx))
                if (response?.data?.deleted) {
                    navigation.goBack()
                }
            }} isShow={modalShow} setIsShow={setModalShow} />
        </SafeAreaView>

    )
}

const StoryScreenStyle = StyleSheet.create({
    profileArea: {
        flexDirection: "row",
        marginTop: 16,
        alignItems: "center"
    },
    profile: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    bottomArea: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export { StoryScreen }