import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { PostDto } from "../../../type/DTO/postDto";
import { storyScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../style/textStyle";
import { ScrollView } from "react-native-gesture-handler";
import { Line } from "../../atoms/line";
import { TagButton } from "../../atoms/tag";


const StoryScreen = ({ route, navigation }: storyScreenProps) => {
    const { colors } = useTheme();
    const [post, setPost] = useState<PostDto>()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <BackButton margin={4} onPress={() => {
                        navigation.goBack()
                    }} />
                    <Image style={{ width: "100%", aspectRatio: 1, backgroundColor: colors.card }} source={{ uri: post?.thumbnail }} />
                    <View style={{ padding: 16 }}>
                        <Text style={[textStyle.headline1, { color: colors.text }]}>{`navigate from community ${route.params.storyIdx}`}</Text>
                        <View style={StoryScreenStyle.profileArea}>
                            <Image style={[StoryScreenStyle.profile, { backgroundColor: colors.card }]} source={{ uri: post?.user?.profile }}></Image>
                            <Text style={[textStyle.body2, { color: colors.text, marginStart: 8 }]}>{route.params.storyIdx}</Text>
                            <Text style={[textStyle.body2, { color: colors.text, marginStart: 16 }]}>2022.08.17 15:03</Text>
                        </View>
                        <Text style={[textStyle.body2, { marginTop: 24, color: colors.text }]}>{`story${route.params.storyIdx}! `.repeat(100)}</Text>
                        <View style={{ flexDirection: "row", width: "100%", marginTop : 24, marginBottom : 24 }}>
                            {

                                ["tag11", "tag2"].map((tag) => {
                                    return (<TagButton key={`tag_${tag}`} text={tag} onPress={() => { }} marginEnd={8} />)
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View>
                <Line />
            </View>
        </SafeAreaView>

    )
}

const StoryScreenStyle = StyleSheet.create({
    profileArea: {
        flexDirection: "row",
        marginTop: 16,
        alignItems: "center"
    },
    profile: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
})

export { StoryScreen }