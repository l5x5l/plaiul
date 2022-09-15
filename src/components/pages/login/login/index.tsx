import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiBaseResponse } from "../../../../api";
import { loginResult, postLogin } from "../../../../api/login";
import textStyle from "../../../../style/textStyle";
import { LoginScreenProps } from "../../../../type/navigate/types";
import { StyledButton } from "../../../atoms/button";
import { Line } from "../../../atoms/line";
import { Logo } from "../../../atoms/logo";

const LoginScreen = ({ navigation }: LoginScreenProps) => {

    const { colors } = useTheme()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginResult, setLoginResult] = useState<apiBaseResponse<loginResult, undefined>>()

    useEffect(() => {
        console.log(JSON.stringify(loginResult))
        if (loginResult !== undefined) {
            if (loginResult.data !== undefined) {
                // 토큰 저장
            } else {
                //console.log(JSON.stringify(loginResult))
            }
        }
    }, [loginResult])

    return (
        <SafeAreaView style={LoginScreenStyle.safeAreaView}>
            <View style={LoginScreenStyle.mainContainer}>
                <Logo />
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={[textStyle.headline1, { color: colors.text, marginTop: 96 }]}>Login</Text>
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 40, alignItems: "center", height : 48}}>
                        <Image source={require("../../../../assets/images/profile_20.png")} style={{ width: 20, height: 20, tintColor: colors.border,  paddingVertical : 8 }} />
                        <TextInput style={[textStyle.body1, { color: colors.text, flex: 1, marginStart: 8 }]} onChangeText={setEmail}/>
                    </View>
                    <Line />
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 8, alignItems : "center",  height : 48}}>
                        <Image source={require("../../../../assets/images/lock_20.png")} style={{ height: 20, width: 20, tintColor: colors.border, paddingVertical : 8  }} resizeMode="contain" />
                        <TextInput onChangeText={setPassword} style={[textStyle.body1, { color: colors.text, flex: 1, marginStart: 8}]} secureTextEntry={true}/>
                    </View>
                    <Line />
                    <StyledButton onClick={ async () => {
                        const response = await postLogin(email, password)
                        setLoginResult(response)
                    }} style={"background"} text={"로그인"} marginTop={24} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", position: "absolute", bottom: 48, start: 0, end: 0 }}>
                    <Pressable onPress={() => { navigation.push("SignUp") }}>
                        <Text style={[textStyle.title2, { color: colors.text, paddingHorizontal: 24, paddingVertical: 8 }]}>회원가입</Text>
                    </Pressable>
                    <View style={{ width: 1, backgroundColor: colors.border, marginVertical: 4 }} />
                    <Pressable>
                        <Text style={[textStyle.title2, { color: colors.text, paddingHorizontal: 24, paddingVertical: 8 }]}>비밀번호 찾기</Text>
                    </Pressable>
                </View>
                <Pressable style={{ position: "absolute", top: 16, right: 16, padding: 8 }} onPress={() => { navigation.goBack() }}>
                    <Image source={require("../../../../assets/images/cancel_24.png")} style={{ height: 24, width: 24, tintColor: colors.border }} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const LoginScreenStyle = StyleSheet.create({
    safeAreaView: {
        height: Dimensions.get("window").height
    },
    mainContainer: {
        flex: 1, padding: 24
    }
})

export { LoginScreen }