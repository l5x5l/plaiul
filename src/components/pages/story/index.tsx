import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { storyScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../style/textStyle";
import { ScrollView } from "react-native-gesture-handler";
import { Line } from "../../atoms/line";
import { TagButton } from "../../atoms/tag";
import { useDispatch, useSelector } from "react-redux";
import { rootDispatch, rootState } from "../../../redux/store";
import storySlice, { loadStory, storySliceState } from "../../../redux/story/storySlice";


const StoryScreen = ({ route, navigation }: storyScreenProps) => {
    const { colors } = useTheme();

    const dispatch = useDispatch<rootDispatch>()
    const story = useSelector<rootState, storySliceState>(state => state.story)
    const action = storySlice.actions

    useEffect(() => {
        dispatch(loadStory(route.params.storyIdx))
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <BackButton margin={4} onPress={() => {
                        navigation.goBack()
                    }} />
                    <Image style={{ width: "100%", aspectRatio: 1, backgroundColor: colors.card }} source={{ uri: (story.value.images && story.value.images.length >= 1) ? story.value.images[0] : "" }} />
                    <View style={{ padding: 16 }}>
                        <Text style={[textStyle.headline1, { color: colors.text }]}>{(!story.isError) ? (story.value.title) : "에러입니다."}</Text>
                        <View style={StoryScreenStyle.profileArea}>
                            <Image style={[StoryScreenStyle.profile, { backgroundColor: colors.card }]} source={{ uri: story.value.user?.profile }}></Image>
                            <Text style={[textStyle.body2, { color: colors.text, marginStart: 8 }]}>{story.value.user.nickname}</Text>
                            <Text style={[textStyle.body2, { color: colors.text, marginStart: 16 }]}>{story.value.createdAt}</Text>
                        </View>
                        <Text style={[textStyle.body2, { marginTop: 24, color: colors.text }]}>{story.value.content}</Text>
                        <View style={{ flexDirection: "row", width: "100%", marginTop: 24, marginBottom: 24 }}>
                            {
                                story.value.tags.map((tag) => {
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