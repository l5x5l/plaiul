import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getMyPage } from "../../../../api/mypage";
import LoginSlice from "../../../../redux/login/loginSlice";
import { rootDispatch, rootState } from "../../../../redux/store";
import textStyle from "../../../../style/textStyle";
import { UserDto } from "../../../../type/DTO/userDto";
import { RootStackParamList } from "../../../../type/navigate/types";
import callNeedLoginApi from "../../../../util/callNeedLogin";
import { removeAccessToken, removeRefreshToken } from "../../../../util/token";
import { Line } from "../../../atoms/line";
import { TextButton } from "../../../atoms/textButton";

export declare type MyPageScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Main", undefined>
}


const MyPageScreen = (props: MyPageScreenProps) => {

    const { colors } = useTheme();
    const [userInfo, setUserInfo] = useState<UserDto>()
    const isLogin = useSelector<rootState, boolean>(state => state.login.isLogin)
    const action = LoginSlice.actions
    const dispatch = useDispatch<rootDispatch>()

    const loadMyPageData = async () => {
        const result = await callNeedLoginApi(() => getMyPage())
        console.log(JSON.stringify(result))
        if (result?.data) {
            setUserInfo(result.data)
        }
    }

    useEffect(() => {
        if (isLogin) {
            loadMyPageData()
        } else {
            setUserInfo(undefined)
        }
    }, [isLogin])

    return (
        <ScrollView style={MyPageStyle.container}>
            {
                userInfo !== undefined ?
                    <View style={MyPageStyle.titleArea}>
                        <Text style={[textStyle.headline1, { color: colors.text, flex: 1 }]}>{`반가워요\n${userInfo.nickname}님!`}</Text>
                        <Image style={{ height: 64, width: 64, borderRadius: 32 }} source={{ uri: (userInfo.profile !== undefined) ? userInfo.profile : "https://reactnative.dev/img/tiny_logo.png" }} />
                    </View>
                    :
                    <Pressable onPress={() => {
                        props.navigation.push("LoginHome")
                    }} style={{ marginTop: 24 }}>
                        <Text style={[textStyle.headline1, { color: colors.text, flex: 1 }]}>{`로그인/회원가입 하기`}</Text>
                    </Pressable>
            }
            <Line marginTop={24} />
            <Text style={[textStyle.headline3, { color: colors.text, marginTop: 24, marginBottom: 16 }]}>내 활동</Text>
            <TextButton text={"좋아요 한 게시글"} onPress={function (): void {

            }} />
            <TextButton text={"좋아요 한 Grower's tip"} onPress={function (): void {

            }} />
            <TextButton text={"내가 쓴 게시글"} onPress={function (): void {

            }} />
            <TextButton text={"내가 쓴 Grower's tip"} onPress={function (): void {

            }} />
            <TextButton text={"댓글 단 게시글"} onPress={function (): void {

            }} />
            <Line marginTop={16} />
            <Text style={[textStyle.headline3, { color: colors.text, marginTop: 24, marginBottom: 16 }]}>설정</Text>
            <TextButton text={"내 계정 정보"} onPress={function (): void {

            }} />
            <TextButton text={"비밀번호 변경"} onPress={function (): void {

            }} />
            <TextButton text={"프로필 수정"} onPress={function (): void {
                if (userInfo) {
                    props.navigation.push("EditProfile", { userInfo })
                }
            }} />
            <TextButton text={"고객센터"} onPress={function (): void {

            }} />
            <TextButton text={"로그아웃"} onPress={async () => {
                await removeAccessToken()
                await removeRefreshToken()
                dispatch(action.logout())
            }} />
            <Line marginTop={16} />
            <View style={{ height: 56 }} />
        </ScrollView>
    )
}

const MyPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    titleArea: {
        flexDirection: "row",
        marginTop: 24
    },
})

export { MyPageScreen }