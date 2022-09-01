import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import textStyle from "../../../../style/textStyle";
import { UserDto } from "../../../../type/DTO/userDto";
import { RootStackParamList } from "../../../../type/navigate/types";
import { Line } from "../../../atoms/line";
import { TextButton } from "../../../atoms/textButton";

export declare type MyPageScreenProps = {
    navigation : NativeStackNavigationProp<RootStackParamList, "Main", undefined>
}


const MyPageScreen = (props : MyPageScreenProps) => {

    const { colors } = useTheme();
    const [userInfo, setUserInfo] = useState<UserDto>({ nickname: "probe", userIdx: -1 })

    return (
        <ScrollView style={MyPageStyle.container}>
            <View style={MyPageStyle.titleArea}>
                <Text style={[textStyle.headline1, { color: colors.text, flex: 1 }]}>{(userInfo.nickname !== "loading") ? `반가워요\n${userInfo.nickname}님!` : `loading...`}</Text>
                <Image style={{ height: 64, width: 64, borderRadius: 32 }} source={{ uri: (userInfo.profile !== undefined) ? userInfo.profile : "https://reactnative.dev/img/tiny_logo.png" }} />
            </View>
            <Line marginTop={24} />
            <Text style={[textStyle.headline3, { color: colors.text, marginTop: 24, marginBottom: 16 }]}>내 활동</Text>
            <TextButton text={"좋아요 한 게시글"} onPress={function (): void {
                props.navigation.push("LoginHome")
            }} />
            <TextButton text={"좋아요 한 Grower's tip"} onPress={function (): void {

            }} />
            <TextButton text={"내가 쓴 게시글"} onPress={function (): void {

            }} />
            <TextButton text={"내가 쓴 Grower's tip"} onPress={function (): void {

            }} />
            <TextButton text={"댓글 단 게시글"} onPress={function (): void {

            }} />
            <Line marginTop={16} />
            <Text style={[textStyle.headline3, { color: colors.text, marginTop: 24, marginBottom: 16 }]}>설정</Text>
            <TextButton text={"내 계정 정보"} onPress={function (): void {

            }} />
            <TextButton text={"비밀번호 변경"} onPress={function (): void {

            }} />
            <TextButton text={"프로필 수정"} onPress={function (): void {

            }} />
            <TextButton text={"고객센터"} onPress={function (): void {

            }} />
            <Line marginTop={16} />
            <View style={{ height: 56 }} />
        </ScrollView>
    )
}

const MyPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    titleArea: {
        flexDirection: "row",
        marginTop: 24
    },
})

export { MyPageScreen }