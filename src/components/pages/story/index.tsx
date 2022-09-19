import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { storyScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../style/textStyle";
import { ScrollView } from "react-native-gesture-handler";
import { Line } from "../../atoms/line";
import { TagButton } from "../../atoms/tag";
import { useDispatch, useSelector } from "react-redux";
import { rootDispatch, rootState } from "../../../redux/store";
import storySlice, { loadStory, storySliceState, toggleLike } from "../../../redux/story/storySlice";


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
                <View style={StoryScreenStyle.bottomArea}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Pressable style={{ flexDirection: "row", alignItems: "center", paddingVertical : 14}}>
                            <Image source={require("../../../assets/images/comment_28.png")} style={{ height: 28, width: 28, marginStart: 14, tintColor : colors.border }} resizeMode="center"/>
                            <Text style={[textStyle.body2, {color : colors.text, marginStart : 4}]}>{story.value.commentCnt}</Text>
                        </Pressable>
                        <Pressable style={{ flexDirection: "row", alignItems: "center", paddingVertical : 14}} onPress={() => {
                            dispatch(toggleLike(route.params.storyIdx))
                        }}>
                            <Image source={ (story.value.isLiked) ? require("../../../assets/images/heart_fill_28.png") : require("../../../assets/images/heart_stroke_28.png")} style={{ height: 28, width: 28, marginStart: 14, tintColor : colors.border }} />
                            <Text style={[textStyle.body2, {color : colors.text, marginStart : 4}]}>{story.value.likeCnt}</Text>
                        </Pressable>
                    </View>
                    <Pressable style={{padding : 14}}>
                        <Image source={require("../../../assets/images/share_28.png")} style={{ height: 28, width: 28}} />
                    </Pressable>
                </View>
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
    bottomArea: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export { StoryScreen }