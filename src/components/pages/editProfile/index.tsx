import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Platform, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../style/textStyle";
import { photo } from "../../../type/data/tipContent";
import { editProfileScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { StyledButton } from "../../atoms/button";
import { Line } from "../../atoms/line";

const EditProfileScreen = ({ navigation, route }: editProfileScreenProps) => {
    const { colors } = useTheme()
    const prevNickname = route.params.userInfo.nickname
    const prevProfile = route.params.userInfo.profile
    const [nickname, setNickname] = useState(route.params.userInfo.nickname)
    const [profile, setProfile] = useState(route.params.userInfo.profile)

    const checkAvailable = () => {
        return (nickname !== prevNickname || prevProfile !== profile)
    }

    const editProfile = async( newNickname : string, newProfileUri ?: string ) => {
        if (newNickname !== prevProfile) {

        }
        if (newProfileUri !== prevProfile && newProfileUri !== undefined) {
            const newProfile : photo = {
                uri : newProfileUri,
                fileName : `${route.params.userInfo.userIdx}_profile_image`
            }
        }
    }

    return (
        <SafeAreaView style={EditProfileStyle.mainContainer}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <BackButton margin={4} onPress={() => { navigation.goBack() }} />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 60 }}>
                    <Pressable>
                        <Image source={{ uri: profile }} style={[EditProfileStyle.profileImage, { backgroundColor: colors.card }]} />
                    </Pressable>
                    <Pressable onPress={async () => {
                          const response = await launchImageLibrary({ mediaType: "photo"})
                          if (response.assets != undefined) {
                            const uri = (response.assets[0].uri === undefined) ? undefined : response.assets[0].uri
                            setProfile(uri)
                        }
                    }}>
                        <Text style={[textStyle.caption, { color: colors.text, padding: 8, marginBottom : 40 }]}>사진 변경하기</Text>
                    </Pressable>
                    <View style={{ width: "100%", marginBottom : 40 }}>
                        <Text style={[textStyle.title2, { color: colors.text, marginBottom: 8}]}>닉네임</Text>
                        <View style={{ flexDirection: "row", marginVertical: 8 }}>
                            <TextInput style={[textStyle.body2, { color: colors.text, flex: 1 }]} defaultValue={nickname} onChangeText={setNickname}/>
                            <Text style={[textStyle.caption, { color: colors.text }]}>{`${nickname.length}/10`}</Text>
                        </View>
                        <Line />
                        <Text style={[textStyle.caption, { color: colors.text, marginTop: 8 }]}></Text>
                    </View>
                </View>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <StyledButton onClick={ () =>
                        editProfile(nickname, profile)
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