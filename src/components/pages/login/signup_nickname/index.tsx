import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { apiBaseResponse } from "../../../../api";
import { checkNicknameResult, getCheckNickname, postSignUp, signUpResult } from "../../../../api/login";
import { useTextInput } from "../../../../hooks/useInput";
import signUpSlice, { signupSliceState } from "../../../../redux/login/signup";
import { rootState, store } from "../../../../redux/store";
import textStyle from "../../../../style/textStyle";
import { SignUpNicknameScreenProps } from "../../../../type/navigate/types";
import { BackButton } from "../../../atoms/backButton";
import { StyledButton } from "../../../atoms/button";
import { Line } from "../../../atoms/line";

const SignUpNicknameScreen = ({ navigation }: SignUpNicknameScreenProps) => {

    const { colors } = useTheme();
    const { text: nicknameText, onChangeInputText: nicknameChange, isError: nicknameError } = useTextInput({ regex: /^.{1,10}$/ })
    const signUpInfo = useSelector<rootState, signupSliceState>(state => state.signup)
    const action = signUpSlice.actions
    const [signUpResult, setSignUpResult] = useState<apiBaseResponse<signUpResult, undefined>>()

    const [checkNicknameResult, setCheckNicknameResult] = useState<apiBaseResponse<checkNicknameResult, undefined>>()
    const [signUpAvailable, setSignUpAvailable] = useState(false)
    const [descriptionMessage, setDescriptionMessage] = useState("")

    const [signUpPending, setSignUpPending] = useState(false)

    const timer = useRef<number | undefined>()

    useEffect(() => {
        if (checkNicknameResult !== undefined) {
            if (checkNicknameResult.data !== undefined && checkNicknameResult.data.verified) {
                setSignUpAvailable(true)
                setDescriptionMessage("사용가능한 닉네임입니다")
                store.dispatch(action.setNickname(nicknameText))
            } else {
                setSignUpAvailable(false)
                setDescriptionMessage(checkNicknameResult.message ? checkNicknameResult.message  : "닉네임 중복검사 과정에서 문제가 발생했습니다.")
            }
        } else {
            setSignUpAvailable(false)
        }
    }, [checkNicknameResult])

    useEffect(() => {
        if (signUpResult !== undefined) {
            setSignUpPending(false)
            if (signUpResult.data !== undefined) {
                // 토큰 저장 후 현 navigate 제거
                navigation.popToTop()
            } else {
                // 토스트 메세지로 회원가입 실패 알림
            }
        }
    }, [signUpResult])

    const debounceCheckNickname = (text: string) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(async () => {
            const result = await getCheckNickname(text)
            setCheckNicknameResult(result)
        }, 500)
    }

    return (
        <SafeAreaView style={SignUpNicknameStyle.safeAreaView}>
            <View style={SignUpNicknameStyle.mainContainer}>
                <BackButton onPress={() => { navigation.goBack() }} />
                <View style={SignUpNicknameStyle.middleArea}>
                    <Text style={[textStyle.headline2, { color: colors.text }]}>{"마지막으로,\n사용할 닉네임을\n입력해주세요"}</Text>
                    <TextInput style={[textStyle.body1, { color: colors.text, paddingVertical: 8, marginTop: 96 }]} onChangeText={(text) => {
                        nicknameChange(text)
                        setSignUpAvailable(false)
                        setDescriptionMessage("")
                        if (!nicknameError) {
                            debounceCheckNickname(text)
                        }
                    }} />
                    <Line />
                    <View style={SignUpNicknameStyle.messageArea}>
                        <Text style={[textStyle.caption, { color: colors.text }]}>{nicknameError ? "1글자 이상, 10글자 이내로 입력해주세요" : descriptionMessage}</Text>
                        <Text style={[textStyle.caption, { color: colors.text }]}>{`${nicknameText.length}/10`}</Text>
                    </View>
                </View>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <StyledButton onClick={
                        async () => {
                            setSignUpPending(true)
                            console.log(JSON.stringify(signUpInfo))
                            const result = await postSignUp(signUpInfo.email, signUpInfo.password, signUpInfo.nickname)
                            setSignUpResult(result)
                        }
                    } style={"background"} text={"회원가입"} height={56} enable={!nicknameError && signUpAvailable && !signUpPending} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const SignUpNicknameStyle = StyleSheet.create({
    safeAreaView: {
        height: Platform.OS === "android" ? Dimensions.get("window").height - StatusBar.currentHeight!! : Dimensions.get("window").height
    },
    mainContainer: {
        flex: 1
    },
    middleArea: {
        marginHorizontal: 40,
        marginTop: 112
    },
    messageArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8
    }
})

export { SignUpNicknameScreen }