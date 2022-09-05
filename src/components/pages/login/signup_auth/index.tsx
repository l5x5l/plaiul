import { useTheme } from "@react-navigation/native";
import React from "react";
import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../../style/textStyle";
import { SignUpAuthScreenProps } from "../../../../type/navigate/types";
import { BackButton } from "../../../atoms/backButton";
import { StyledButton } from "../../../atoms/button";
import { Line } from "../../../atoms/line";

const SignUpAuthScreen = ({navigation} : SignUpAuthScreenProps) => {

    const {colors} = useTheme();

    return (
        <SafeAreaView style={SignUpAuthStyle.safeAreaView}>
            <View style={SignUpAuthStyle.mainContainer}>
                <BackButton onPress={()=> { navigation.goBack() }}/>
                <View style={SignUpAuthStyle.middleArea}>
                    <Text style={[textStyle.headline2, {color : colors.text}]}>{"인증번호를\n입력해주세요"}</Text>
                    <View style={{flexDirection : "row", marginTop : 96, alignItems : "flex-end"}}>
                        <View style={{flex : 1, marginEnd : 8}}>
                            <TextInput style={[textStyle.body1, {color : colors.text, flex : 1}]}/>
                            <Line/>
                        </View>
                        <StyledButton onClick={() => {

                        }} style={"stroke"} text={"재전송"} paddingHorizon={12} paddingVertical={12}/>
                    </View>
                    <Text style={[textStyle.caption, {color : colors.text, marginTop : 8}]}>{`남은시간 3:00`}</Text>
                    <Text style={[textStyle.caption, {color : colors.notification, marginTop : 8}]}>{`테스트 에러메세지`}</Text>
                </View>
                <View style={{position : "absolute", bottom : 0, width : "100%"}}>
                    <StyledButton onClick={
                        () => { navigation.push("Nickname") }
                    } style={"background"} text={"인증번호 확인"} height={56} />
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
        marginTop : 112
    },
})

export {SignUpAuthScreen}