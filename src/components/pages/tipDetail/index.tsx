import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { patchToggleLikeResult } from "../../../api/stories";
import { getTipDetail, patchToggleTipLike } from "../../../api/tip";
import LoginSlice from "../../../redux/login/loginSlice";
import { rootDispatch } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { TipDeatilDto } from "../../../type/DTO/tipDto";
import { TipDeatilScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { checkIsLogin } from "../../../util/token";
import { BackButton } from "../../atoms/backButton";
import { Line } from "../../atoms/line";

const TipDetailScreen = ({ route, navigation }: TipDeatilScreenProps) => {
    const { colors } = useTheme();
    const [tipDetail, setTipDetail] = useState<TipDeatilDto>()
    const dispatch = useDispatch<rootDispatch>()
    const loginAction = LoginSlice.actions

    const loadTipDetail = async () => {
        const response = await callNeedLoginApi<TipDeatilDto, any>(() => getTipDetail(route.params.tipIdx))
        if (response?.data)
            setTipDetail(response.data)
    }

    const toggleLike = async () => {
        const response = await callNeedLoginApi<patchToggleLikeResult, any>(() => patchToggleTipLike(route.params.tipIdx))
        console.log(JSON.stringify(response))
        if (response?.data && tipDetail) {
            const temp = { ...tipDetail }
            temp.isLiked = response.data.isLiked
            if (temp.isLiked) {
                temp.likeCnt += 1
            } else {
                temp.likeCnt -= 1
            }

            setTipDetail(temp)

        }
    }

    useEffect(() => {
        if (route.params.preview && route.params.tip) {
            //console.log(JSON.stringify(route.params.tip))
            setTipDetail(route.params.tip!!)
        } else {
            loadTipDetail()
        }
    }, [])

    return (
        <SafeAreaView style={TipDetailStyle.safeAreaView}>
            <View style={{ flex: 1 }}>
                <BackButton onPress={() => { navigation.goBack() }} />
                <ScrollView style={TipDetailStyle.mainContainer}>
                    <View style={TipDetailStyle.mainContainer}>
                        <Image source={{ uri: tipDetail?.thumbnail }} style={[TipDetailStyle.mainImage, { backgroundColor: colors.card }]} />
                        <View style={TipDetailStyle.titleArea}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[textStyle.headline1, { color: colors.text, flex: 1 }]}>{tipDetail?.title}</Text>
                                <View>
                                    <Pressable>
                                        <Image source={require("../../../assets/images/heart_stroke_28.png")} style={[TipDetailStyle.iconButton, { marginTop: 6, tintColor: colors.border }]} />
                                    </Pressable>
                                    <Pressable>
                                        <Image source={require("../../../assets/images/share_28.png")} style={[TipDetailStyle.iconButton, { marginTop: 12, tintColor: colors.border }]} />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 16, alignItems: "center" }}>
                                <Image source={{ uri: tipDetail?.user.profile }} style={[TipDetailStyle.profile, { backgroundColor: colors.card }]} />
                                <Text style={[textStyle.body2, { color: colors.text, marginStart: 8 }]}>{tipDetail?.user.nickname}</Text>
                                <Text style={[textStyle.body2, { color: colors.text, marginStart: 8 }]}>{tipDetail?.createdAt}</Text>
                            </View>
                        </View>
                        <View style={TipDetailStyle.contentArea}>
                            {
                                tipDetail?.content.map((data, index) => {
                                    console.log(JSON.stringify(data))
                                    return data.type === 1 ? <Text key={`text_${index}`} style={[textStyle.body2, { color: colors.text, marginBottom: 16 }]}>{data.text}</Text> : <Image key={`image_${index}`} source={{ uri: data.image }} style={{ marginBottom: 16, width: "100%", aspectRatio: 1 }} />
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <View>
                    <Line />
                    {
                        // 미리보기에서는 하단 부분 표시 X
                        route.params.preview ?
                            null
                            :
                            <View style={TipDetailStyle.bottomArea}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Pressable style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14 }} onPress={async () => {
                                        const isLogin = await checkIsLogin()
                                        if (isLogin) {
                                            toggleLike()
                                        } else {
                                            dispatch(loginAction.callBottomSheet())
                                        }
                                    }}>
                                        <Image source={(tipDetail?.isLiked) ? require("../../../assets/images/heart_fill_28.png") : require("../../../assets/images/heart_stroke_28.png")} style={{ height: 28, width: 28, marginStart: 14, tintColor: colors.border }} />
                                        <Text style={[textStyle.body2, { color: colors.text, marginStart: 4 }]}>{tipDetail?.likeCnt}</Text>
                                    </Pressable>
                                </View>
                                <Pressable style={{ padding: 14 }}>
                                    <Image source={require("../../../assets/images/share_28.png")} style={{ height: 28, width: 28, tintColor: colors.border }} />
                                </Pressable>
                            </View>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const TipDetailStyle = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    mainContainer: {
        flex: 1
    },
    titleArea: {
        padding: 16
    },
    tipTextContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    tipImageContent: {
        paddingHorizontal: 16,
        width: "100%"
    },
    mainImage: {
        width: "100%",
        aspectRatio: 1
    },
    profile: {
        borderRadius: 20,
        height: 40,
        width: 40
    },
    iconButton: {
        height: 28,
        width: 28
    },
    contentArea: {
        paddingHorizontal: 16,
        marginTop: 20
    },
    bottomArea: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export { TipDetailScreen }