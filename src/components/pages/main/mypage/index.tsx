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

    const modifyProfile = (newProfile : UserDto) => {
        setUserInfo(newProfile)
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
                        <Text style={[textStyle.headline1, { color: colors.text, flex: 1 }]}>{`????????????\n${userInfo.nickname}???!`}</Text>
                        {
                            userInfo.profile !== undefined ?
                            <Image style={{ height: 64, width: 64, borderRadius: 32, backgroundColor : colors.card }} source={{ uri: userInfo.profile }} />
                            :
                            <View style={{ height: 64, width: 64, borderRadius: 32, backgroundColor : colors.card }}/>
                        }
                    </View>
                    :
                    <Pressable onPress={() => {
                        props.navigation.push("LoginHome")
                    }} style={{ marginTop: 24 }}>
                        <Text style={[textStyle.headline1, { color: colors.text, flex: 1 }]}>{`?????????/???????????? ??????`}</Text>
                    </Pressable>
            }
            <Line marginTop={24} />
            <Text style={[textStyle.headline3, { color: colors.text, marginTop: 24, marginBottom: 16 }]}>??? ??????</Text>
            <TextButton text={"????????? ??? ?????????"} onPress={() => {
                props.navigation.push("MyPagePost", { category: "likePost", detailCategory: "story" })
            }} enable={isLogin} />
            <TextButton text={"????????? ??? Grower's tip"} onPress={() => {
                props.navigation.push("MyPagePost", { category: "likeTip" })
            }} enable={isLogin} />
            <TextButton text={"?????? ??? ?????????"} onPress={() => {
                props.navigation.push("MyPagePost", { category: "myPost", detailCategory: "story" })
            }} enable={isLogin} />
            <TextButton text={"?????? ??? Grower's tip"} onPress={() => {
                props.navigation.push("MyPagePost", { category: "myTip", detailCategory: "story" })
            }} enable={isLogin} />
            <TextButton text={"?????? ??? ?????????"} onPress={() => {
                props.navigation.push("MyPagePost", { category: "commentPost", detailCategory: "story" })
            }} enable={isLogin} />
            <Line marginTop={16} />
            <Text style={[textStyle.headline3, { color: colors.text, marginTop: 24, marginBottom: 16 }]}>??????</Text>
            <TextButton text={"??? ?????? ??????"} onPress={() => {

            }} enable={isLogin} />
            <TextButton text={"???????????? ??????"} onPress={() => {

            }} enable={isLogin} />
            <TextButton text={"????????? ??????"} onPress={() => {
                if (userInfo) {
                    props.navigation.push("EditProfile", { userInfo, applyNewProfile : modifyProfile })
                }
            }} enable={isLogin} />
            <TextButton text={"????????????"} onPress={() => {

            }} enable={true} />
            <TextButton text={"????????????"} onPress={async () => {
                await removeAccessToken()
                await removeRefreshToken()
                dispatch(action.logout())
            }} enable={isLogin} />
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