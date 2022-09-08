import { useTheme } from "@react-navigation/native";
import React from "react";
import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTextInput } from "../../../../hooks/useInput";
import textStyle from "../../../../style/textStyle";
import { SignUpNicknameScreenProps } from "../../../../type/navigate/types";
import { BackButton } from "../../../atoms/backButton";
import { StyledButton } from "../../../atoms/button";
import { Line } from "../../../atoms/line";

const SignUpNicknameScreen = ({ navigation }: SignUpNicknameScreenProps) => {

    const { colors } = useTheme();
    const { text: nicknameText, onChangeInputText: nicknameChange, isError: nicknameError } = useTextInput({ regex: /^.{1,10}$/ })

    return (
        <SafeAreaView style={SignUpNicknameStyle.safeAreaView}>
            <View style={SignUpNicknameStyle.mainContainer}>
                <BackButton onPress={() => { navigation.goBack() }} />
                <View style={SignUpNicknameStyle.middleArea}>
                    <Text style={[textStyle.headline2, { color: colors.text }]}>{"마지막으로,\n사용할 닉네임을\n입력해주세요"}</Text>
                    <TextInput style={[textStyle.body1, { color: colors.text, paddingVertical: 8, marginTop: 96 }]} onChangeText={nicknameChange}  />
                    <Line />
                    <View style={SignUpNicknameStyle.messageArea}>
                        <Text style={[textStyle.caption, { color: colors.text }]}>{nicknameError ? "1글자 이상, 10글자 이내로 입력해주세요" : "사용가능한 닉네임입니다"}</Text>
                        <Text style={[textStyle.caption, { color: colors.text }]}>{`${nicknameText.length}/10`}</Text>
                    </View>
                </View>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <StyledButton onClick={
                        () => { navigation.popToTop() }
                    } style={"background"} text={"회원가입"} height={56} />
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