import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { authNumberResult, postAuthNumber } from "../../../../api/login";
import { useTextInput } from "../../../../hooks/useInput";
import signUpSlice from "../../../../redux/login/signup";
import { store } from "../../../../redux/store";
import textStyle from "../../../../style/textStyle";
import { SignUpEmailScreenProps } from "../../../../type/navigate/types";
import { BackButton } from "../../../atoms/backButton";
import { StyledButton } from "../../../atoms/button";
import { Line } from "../../../atoms/line";

const SignUpEmailScreen = ({ navigation }: SignUpEmailScreenProps) => {
    const { colors } = useTheme()
    const {text : emailText, onChangeInputText : emailInputEvent, isError : emailError} = useTextInput({regex : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })
    const [sendAuthCodeResult, setSendAuthCodeResult] = useState<authNumberResult>()
    const action = signUpSlice.actions

    const [pending, setPending] = useState(false)

    useEffect(() => {
        if (sendAuthCodeResult !== undefined) {
            if (sendAuthCodeResult.sent) {
                store.dispatch(action.setEmail(emailText))
                navigation.push("Auth")
            } else {
                // error
            }
        }
        setPending(false)
    }, [sendAuthCodeResult])

    return (
        <SafeAreaView style={SignUpEmailStyle.safeAreaView}>
            <View style={SignUpEmailStyle.mainContainer}>
                <BackButton onPress={() => {
                    navigation.goBack();
                }} />
                <View style={SignUpEmailStyle.middleArea}>
                    <Text style={[textStyle.headline2, { color: colors.text }]}>{"이메일 주소를\n입력해주세요"}</Text>
                    <Text style={[textStyle.caption, { color: colors.text, marginTop: 16 }]}>입력한 이메일로 인증번호가 발송됩니다</Text>
                    <TextInput style={[textStyle.body1, { color: colors.text, marginTop: 80, paddingVertical : 8 }]} defaultValue={emailText} onChangeText={emailInputEvent}/>
                    <Line/>
                </View>
                <View style={{position : "absolute", bottom : 0, width : "100%"}}>
                    <StyledButton onClick={
                        async () => { 
                            setPending(true)
                            const result = await postAuthNumber(emailText)
                            setSendAuthCodeResult(result.data)
                        }
                    } style={"background"} text={"인증번호 발송"} height={56} enable={!emailError && !pending}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const SignUpEmailStyle = StyleSheet.create({
    safeAreaView: {
        height: Platform.OS === "android" ? Dimensions.get("window").height - StatusBar.currentHeight!! : Dimensions.get("window").height
    },
    mainContainer: {
        flex: 1
    },
    middleArea: {
        marginHorizontal: 40,
        marginTop : 112
    }
})

export { SignUpEmailScreen }