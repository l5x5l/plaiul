import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, Platform, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { modifyProfile } from "../../../api/mypage";
import textStyle from "../../../style/textStyle";
import { editProfileScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { BackButton } from "../../atoms/backButton";
import { StyledButton } from "../../atoms/button";
import { Line } from "../../atoms/line";

const EditProfileScreen = ({ navigation, route }: editProfileScreenProps) => {
    const { colors } = useTheme()
    const prevNickname = route.params.userInfo.nickname
    const prevProfileImageUri = route.params.userInfo.profile
    const [nickname, setNickname] = useState(route.params.userInfo.nickname)
    const [profileImageUri, setProfileImageUri] = useState(route.params.userInfo.profile)

    const checkAvailable = () => {
        return (nickname !== prevNickname || prevProfileImageUri !== profileImageUri)
    }

    const editProfile = async (newNickname: string, newProfileUri?: string) => {
        const body = new FormData()
        if (newNickname !== prevProfileImageUri) {
            body.append("nickname", newNickname)
        }
        if (newProfileUri !== prevProfileImageUri) {
            setFormDataProfileImage(body, newProfileUri)
        }
 
        const result = await callNeedLoginApi(() => modifyProfile(body))

        if (result?.data?.modified) {
            navigation.goBack()
        }
    }

    const setFormDataProfileImage = (body: FormData, newProfileUri?: string) => {
        const useDefaultProfile = newProfileUri === undefined
        if (useDefaultProfile) {
            body.append("defaultProfile", true)
        } else {
            const newProfile = {
                uri: newProfileUri,
                type: "multipart/form-data",
                name: `${route.params.userInfo.userIdx}_profile_image`
            }
            body.append("profile", newProfile)
        }
    }

    return (
        <SafeAreaView style={EditProfileStyle.mainContainer}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <BackButton margin={4} onPress={() => { navigation.goBack() }} />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 60 }}>
                    <View>
                        {
                            profileImageUri ?
                                <Image source={{ uri: profileImageUri }} style={[EditProfileStyle.profileImage, { backgroundColor: colors.card }]} />
                                :
                                <View style={[EditProfileStyle.profileImage, { backgroundColor: colors.card }]} />
                        }
                        {
                            profileImageUri &&
                            <Pressable onPress={() => { setProfileImageUri(undefined) }} style={{ position: "absolute", top: 0, right: 0 }}>
                                <View style={{ height: 32, width: 32, backgroundColor: colors.border, alignItems: "center", justifyContent: "center", borderRadius: 16 }}>
                                    <Image source={require("../../../assets/images/cancel_24.png")} style={{ height: 24, width: 24, tintColor: colors.background }} />
                                </View>
                            </Pressable>
                        }
                    </View>

                    <Pressable onPress={async () => {
                        const response = await launchImageLibrary({ mediaType: "photo" })
                        if (response.assets != undefined) {
                            const uri = (response.assets[0].uri === undefined) ? undefined : response.assets[0].uri
                            setProfileImageUri(uri)
                        }
                    }}>
                        <Text style={[textStyle.caption, { color: colors.text, padding: 8 }]}>사진 변경하기</Text>
                    </Pressable>

                    <View style={{ width: "100%", marginBottom: 40 }}>
                        <Text style={[textStyle.title2, { color: colors.text, marginBottom: 8 }]}>닉네임</Text>
                        <View style={{ flexDirection: "row", marginTop: 8 }}>
                            <TextInput style={[textStyle.body2, { color: colors.text, flex: 1 }]} defaultValue={nickname} onChangeText={setNickname} />
                            <Text style={[textStyle.caption, { color: colors.text }]}>{`${nickname.length}/10`}</Text>
                        </View>
                        <Line />
                        <Text style={[textStyle.caption, { color: colors.text, marginTop: 8 }]}></Text>
                    </View>
                </View>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <StyledButton onClick={async () =>
                        editProfile(nickname, profileImageUri)
                    } style={"background"} text={"프로필 수정하기"} height={56} enable={checkAvailable()} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const EditProfileStyle = StyleSheet.create({
    mainContainer: {
        height: Platform.OS === "android" ? Dimensions.get("window").height - StatusBar.currentHeight!! : Dimensions.get("window").height
    },
    profileImage: {
        height: 120, width: 120, borderRadius: 60
    }
})

export { EditProfileScreen }