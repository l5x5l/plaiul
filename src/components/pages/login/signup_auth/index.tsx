import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { apiBaseResponse } from "../../../../api";
import { authNumberResult, checkAuthNumberResult, getCheckAuthNumber, postAuthNumber } from "../../../../api/login";
import { useCounter } from "../../../../hooks/useCounter";
import { useTextInput } from "../../../../hooks/useInput";
import { signupSliceState } from "../../../../redux/login/signup";
import { rootState } from "../../../../redux/store";
import textStyle from "../../../../style/textStyle";
import { SignUpAuthScreenProps } from "../../../../type/navigate/types";
import { BackButton } from "../../../atoms/backButton";
import { StyledButton } from "../../../atoms/button";
import { Line } from "../../../atoms/line";

const SignUpAuthScreen = ({ navigation }: SignUpAuthScreenProps) => {

    const { colors } = useTheme();
    
    const [reSendable, setReSenderble] = useState(true)
    const { text: authText, onChangeInputText: authTextChangeEvent, isError } = useTextInput({ regex: /^\d{6}$/ })
    const signUpInfo = useSelector<rootState, signupSliceState>(state => state.signup)
    const [warningMessage, setWarningMessage] = useState("")
    const [checkAuthCodeResult, setCheckAuthCodeResult] = useState<apiBaseResponse<checkAuthNumberResult, undefined>>()
    const [resendAuthCodeResult, setResendAuthCodeResult] = useState<apiBaseResponse<authNumberResult, undefined>>()
    const [pending, setPending] = useState<boolean>(false)

    const {secondString : timerSecond, startCounter, cancelCounter, clearCounter, secondNumber} = useCounter({startValue : 180})

    useEffect(() => {
        if (checkAuthCodeResult === undefined) return

        if (checkAuthCodeResult?.data !== undefined) {
            console.log(JSON.stringify(checkAuthCodeResult))
            if (checkAuthCodeResult.data.verified) {
                navigation.push("Password")
            } else {
                setWarningMessage(checkAuthCodeResult.message ? checkAuthCodeResult.message : "???????????? ???????????? ????????? ??????????????????.")
            }
        } else {
            setWarningMessage(checkAuthCodeResult?.message ? checkAuthCodeResult.message : "???????????? ???????????? ????????? ??????????????????.")
        }
        setPending(false)
    }, [checkAuthCodeResult])

    useEffect(() => {
        startCounter()

        return () => {
            cancelCounter()
        }
    }, [])

    useEffect(() => {
        if (resendAuthCodeResult === undefined) return
        if (resendAuthCodeResult?.data !== undefined && resendAuthCodeResult.data.sent) {
            setWarningMessage("??????????????? ????????? ???????????????.")
            clearCounter()
        } else {
            setWarningMessage("???????????? ????????? ???????????? ????????? ??????????????????.")
        }
        setReSenderble(true)
    }, [resendAuthCodeResult])

    return (
        <SafeAreaView style={SignUpAuthStyle.safeAreaView}>
            <View style={SignUpAuthStyle.mainContainer}>
                <BackButton onPress={() => { navigation.goBack() }} />
                <View style={SignUpAuthStyle.middleArea}>
                    <Text style={[textStyle.headline2, { color: colors.text }]}>{"???????????????\n??????????????????"}</Text>
                    <View style={{ flexDirection: "row", marginTop: 96, alignItems: "flex-end" }}>
                        <View style={{ flex: 1, marginEnd: 8 }}>
                            <TextInput style={[textStyle.body1, { color: colors.text, flex: 1 }]} defaultValue={authText} onChangeText={(text) => {
                                authTextChangeEvent(text)
                                setWarningMessage("")
                            }
                            } />
                            <Line />
                        </View>
                        <StyledButton onClick={ async () => {
                            setReSenderble(false)
                            const result = await postAuthNumber(signUpInfo.email)
                            setResendAuthCodeResult(result)

                        }} style={"stroke"} text={"?????????"} paddingHorizon={12} paddingVertical={12} enable={reSendable} />
                    </View>
                    <Text style={[textStyle.caption, { color: colors.text, marginTop: 8 }]}>{`???????????? ${timerSecond}`}</Text>
                    <Text style={[textStyle.caption, { color: colors.notification, marginTop: 8 }]}>{warningMessage}</Text>
                </View>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <StyledButton onClick={
                        async () => {
                            setPending(true)
                            const result = await getCheckAuthNumber(signUpInfo.email, authText)
                            setCheckAuthCodeResult(result)
                        }
                    } style={"background"} text={"???????????? ??????"} height={56} enable={!isError && !pending && secondNumber > 0} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const SignUpAuthStyle = StyleSheet.create({
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
})

export { SignUpAuthScreen }