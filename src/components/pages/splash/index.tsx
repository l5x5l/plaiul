import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { getMyPage } from "../../../api/mypage";
import LoginSlice from "../../../redux/login/loginSlice";
import { rootDispatch } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { splashScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { PlaiulNavigation } from "../../../util/navigation";
import { getAccessToken, removeAccessToken, removeRefreshToken } from "../../../util/token";
import { Logo } from "../../atoms/logo";

const SplashScreen = ({navigation} : splashScreenProps) => {
    const {colors} = useTheme()
    const action = LoginSlice.actions
    const dispatch = useDispatch<rootDispatch>()

    useEffect(() => {
        setTimeout(autoLogin, 500)
        PlaiulNavigation.init(() => {navigation.push("LoginHome")})
    }, [])

    // 아직 자동 로그인 api 대신 마이페이지 사용자 조회 api 사용
    const autoLogin = async() => {
        const token = await getAccessToken()
        if (token !== null) {
            const result = await callNeedLoginApi(() => getMyPage())
            if (result?.data)
                dispatch(action.login())
            else {
                dispatch(action.logout())
                await removeAccessToken()
                await removeRefreshToken()
            }
        } else {
            await removeAccessToken()
            await removeRefreshToken()
        }
        navigation.navigate("Main")
    }

    return (
        <SafeAreaView style={{flex : 1}}>
            <View style={{flex : 1, backgroundColor : colors.background, justifyContent : "center", alignItems : "center", flexDirection :"row"}}>
                <Logo/>
                <View>
                    <Text style={[textStyle.caption, {color : colors.text}]}>식물 커뮤니티</Text>
                    <Text style={[textStyle.headline1, {color : colors.text}]}>Plaiul</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export {SplashScreen}