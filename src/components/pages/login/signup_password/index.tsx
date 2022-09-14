import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTextInput } from "../../../../hooks/useInput";
import signUpSlice from "../../../../redux/login/signup";
import { store } from "../../../../redux/store";
import textStyle from "../../../../style/textStyle";
import { SignUpPasswordScreenProps } from "../../../../type/navigate/types";
import { BackButton } from "../../../atoms/backButton";
import { StyledButton } from "../../../atoms/button";
import { Line } from "../../../atoms/line";

const SignUpPasswordScreen = ({navigation} : SignUpPasswordScreenProps) => {
    const { text: passwordText, onChangeInputText: passwordInputEvent, isError: passwordError } = useTextInput({ regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ })
    const { colors } = useTheme()
    const action = signUpSlice.actions
    
    return (
        <SafeAreaView style={SignUpPasswordStyle.safeAreaView}>
            <View style={SignUpPasswordStyle.mainContainer}>
                <BackButton onPress={() => { navigation.goBack()}} />
                <View style={SignUpPasswordStyle.middleArea}>
                    <Text style={[textStyle.headline2, { color: colors.text }]}>{"비밀번호를\n입력해주세요"}</Text>
                    <Text style={[textStyle.caption, { color: colors.text, marginTop: 16 }]}>{"영문,숫자,특수문자 조합으로 8글자 이상 입력해주세요\n사용가능한 특수문자 : @$!%*#?&"}</Text>
                    <TextInput style={[textStyle.body1, { color: colors.text, marginTop: 80, paddingVertical: 8 }]} defaultValue={passwordText} onChangeText={passwordInputEvent} />
                    <Line />
                </View>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <StyledButton onClick={
                        async () => {
                            store.dispatch(action.setPassword(passwordText))
                            navigation.push("Nickname")
                        }
                    } style={"background"} text={"다음으로"} height={56} enable={!passwordError} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const SignUpPasswordStyle = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    mainContainer: {
        flex: 1
    },
    middleArea: {
        marginHorizontal: 40,
        marginTop: 112
    },
})
export {SignUpPasswordScreen}