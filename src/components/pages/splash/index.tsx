import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import LoginSlice from "../../../redux/login/loginSlice";
import { rootDispatch } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { splashScreenProps } from "../../../type/navigate/types";
import { Logo } from "../../atoms/logo";

const SplashScreen = ({navigation} : splashScreenProps) => {
    const {colors} = useTheme()
    const action = LoginSlice.actions
    const dispatch = useDispatch<rootDispatch>()

    useEffect(() => {
        setTimeout(autoLogin, 500)
    }, [])

    // 아직 자동 로그인 api 가 생성되지 않아 임시로 구성
    const autoLogin = async() => {
        dispatch(action.login())
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