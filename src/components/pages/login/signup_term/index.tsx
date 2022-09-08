import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../../style/textStyle";
import { SignUpTermScreenProps } from "../../../../type/navigate/types";
import { BackButton } from "../../../atoms/backButton";
import { StyledButton } from "../../../atoms/button";
import { CheckBox } from "../../../atoms/checkbox";
import { Line } from "../../../atoms/line";

const SignUpTermScreen = ({ navigation }: SignUpTermScreenProps) => {
    const { colors } = useTheme();

    const [firstChecked, setFirstChecked]= useState(false)
    const [secondChecked, setSecondChecked]= useState(false)
    const [allChecked, setAllChecked] = useState(false)


    return (
        <SafeAreaView style={SignUpTermStyle.safeAreaView}>
            <View style={SignUpTermStyle.mainContainer}>
                <BackButton onPress={() => { navigation.goBack() }} />
                <View style={SignUpTermStyle.middleArea}>
                    <Text style={[textStyle.headline2, { color: colors.text }]}>Plaiul에 어서오세요</Text>
                    <Text style={[textStyle.caption, { color: colors.text, marginTop: 24 }]}>{"원활한 서비스 이용을 위한\n약관 동의가 필요합니다"}</Text>
                    <View style={[SignUpTermStyle.rowConatiner, {marginTop : 56, marginBottom : 8}]}>
                        <CheckBox style={"fill"} isChecked={allChecked} setIsChecked={(isCheck) => {
                            setAllChecked(isCheck)
                            setFirstChecked(isCheck)
                            setSecondChecked(isCheck)
                        }}/>
                        <Text style={[textStyle.title1, { color: colors.text, marginStart: 16 }]}>전체 약관 동의</Text>
                    </View>
                    <Line/>
                    <View style={[SignUpTermStyle.rowConatiner, {marginTop : 8}]}>
                        <CheckBox style={"stroke"} isChecked={firstChecked} setIsChecked={(isCheck) => {
                            setAllChecked(isCheck && secondChecked)
                            setFirstChecked(isCheck)
                        }}/>
                        <Text style={[textStyle.body2, { color: colors.text, marginStart: 16 }]}>첫번째 약관 동의</Text>
                    </View>
                    <View style={[SignUpTermStyle.rowConatiner, {marginTop : 8}]}>
                        <CheckBox style={"stroke"} isChecked={secondChecked} setIsChecked={(isCheck) => {
                            setAllChecked(isCheck && firstChecked)
                            setSecondChecked(isCheck)
                        }}/>
                        <Text style={[textStyle.body2, { color: colors.text, marginStart: 16 }]}>두번째 약관 동의</Text>
                    </View>
                </View>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <StyledButton onClick={
                        () => { navigation.push("Email") }
                    } style={"background"} text={"다음으로"} height={56} enable={allChecked}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const SignUpTermStyle = StyleSheet.create({
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
    rowConatiner: {
        flexDirection: "row",
        alignItems : "center"
    }
})

export { SignUpTermScreen }