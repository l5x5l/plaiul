import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../../style/textStyle";
import { SignUpScreenProps } from "../../../../type/navigate/types";
import { StyledButton } from "../../../atoms/button";
import { Logo } from "../../../atoms/logo";

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {

    const { colors } = useTheme()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 24 }}>
                <Logo />
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={[textStyle.headline1, { color: colors.text, marginTop: 96 }]}>회원가입</Text>
                    <StyledButton onClick={() =>
                        navigation.goBack()
                    } style={"stroke"} text={"이메일로 회원가입"} width={"100%"} marginTop={96} />
                </View>
                <Pressable style={{position : "absolute", top: 16, right: 16, padding : 8 }} onPress={() => {navigation.goBack()}}>
                    <Image source={require("../../../../assets/images/cancel_24.png")} style={{ height: 24, width: 24, tintColor : colors.border}} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export { SignUpScreen }