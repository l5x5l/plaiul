import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { getMyPage } from "../../../api/mypage";
import LoginSlice from "../../../redux/login/loginSlice";
import { rootDispatch } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { splashScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { PlaiulNavigation } from "../../../util/navigation";
import { checkIsLogin, removeAccessToken, removeRefreshToken } from "../../../util/token";
import { Logo } from "../../atoms/logo";

const SplashScreen = ({navigation} : splashScreenProps) => {
    const {colors} = useTheme()
    const loginSliceActions = LoginSlice.actions
    const dispatch = useDispatch<rootDispatch>()

    useEffect(() => {
        PlaiulNavigation.init(() => {navigation.push("LoginHome")})
        setTimeout(tryAutoLogin, 500)
    }, [])

    const tryAutoLogin = async() => {
        const token = await checkIsLogin()
        if (token) {
            const result = await callNeedLoginApi(() => getMyPage())
            if (result?.data)
                dispatch(loginSliceActions.login())
            else {
                dispatch(loginSliceActions.logout())
                await removeAccessToken()
                await removeRefreshToken()
            }
        } 
        navigation.navigate("Main")
    }

    return (
        <SafeAreaView style={{flex : 1}}>
            <View style={[splashScreenStyles.mainView ,{backgroundColor : colors.background}]}>
                <Logo/>
                <View>
                    <Text style={[textStyle.caption, {color : colors.text}]}>식물 커뮤니티</Text>
                    <Text style={[textStyle.headline1, {color : colors.text}]}>Plaiul</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const splashScreenStyles = StyleSheet.create({
    mainView : {
        flex : 1, justifyContent : "center", alignItems : "center", flexDirection :"row"
    }
})

export {SplashScreen}