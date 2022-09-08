import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import PagerView, { PagerViewOnPageSelectedEventData } from "react-native-pager-view";
import { stroke2Container } from "../../../style/containerStyle";
import textStyle from "../../../style/textStyle";
import { PostDto } from "../../../type/DTO/postDto";
import { CommunityTabScreenProps } from "../../../type/navigate/types";
export declare type PostPagerViewProps = {
    title: string
}

const PostPagerView = (props: PostPagerViewProps) => {
    const { colors } = useTheme()
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const [activePage, setActivePage] = useState(0)

    const [dataList, setDataList] = useState<PostDto[]>([{
        qnaIdx: 0,
        title: "qnaTitle1",
        content: "qna 1 content will be here!",
        thumbnail: "",
        user: {
            userIdx: 0,
            nickname: "probe"
        }
    }, {
        storyIdx: 0,
        title: "storyTitle1",
        content: "story 1 content will be here!",
        thumbnail: "",

    }, {
        qnaIdx: 1,
        title: "qnaTitle2",
        content: "qna 1 content will be here!",
        thumbnail: "",
        user: {
            userIdx: 0,
            nickname: "probe"
        }
    }])

    const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)
    const navigator = useNavigation<CommunityTabScreenProps>()

    return (
        <View style={{ paddingHorizontal: 16, marginTop: 56, width: "100%", flex: 1 }}>
            <View style={PostPagerStyle.titleArea}>
                <View style={[PostPagerStyle.rowContainer, { alignItems: "flex-end" }]}>
                    <Text style={[textStyle.title1, { color: colors.text }]}>{props.title}</Text>
                    <Text style={[textStyle.body3, { marginStart: 8, color: colors.text }]}>{`${(activePage + 1)} / ${dataList.length}`}</Text>
                </View>
                <View style={PostPagerStyle.rowContainer}>
                    <Pressable onPress={() => {navigator.navigate("Community")}}>
                        <Text style={[textStyle.body3, { color: colors.text }]}>전체보기</Text>
                    </Pressable>
                </View>
            </View>
            {
                useMemo(() =>
                    <AnimatedPagerView onPageScroll={Animated.event<PagerViewOnPageSelectedEventData>(
                        [
                            {
                                nativeEvent: {
                                    position: positionAnimatedValue,
                                },
                            },
                        ],
                        {
                            listener: ({ nativeEvent: { position } }) => {
                                setActivePage(position)
                            },
                            useNativeDriver: true,
                        }
                    )} style={{ height: 256 }} pageMargin={16}>
                        {
                            dataList.map((data, index) => (
                                <View style={{ height: "100%", width: "100%", marginTop: 24 }} collapsable={false} key={`${props.title}_${index}`}>
                                    <View style={[PostPagerStyle.rowContainer, stroke2Container(colors.border)]}>
                                        <View style={{ flex: 1, padding: 16 }}>
                                            <Text style={[textStyle.title2, { color: colors.text }]}>{data.title}</Text>
                                            <Text style={[textStyle.body3, { color: colors.text, marginTop: 4 }]}>{data.content}</Text>
                                            <Text style={[textStyle.caption, { color: colors.text, marginTop: 12 }]}>{data.user?.nickname ? data.user?.nickname : "default"}</Text>
                                        </View>
                                        <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={PostPagerStyle.image} />
                                    </View>
                                    <View style={[PostPagerStyle.rowContainer, stroke2Container(colors.border), { marginTop: 8 }]}>
                                        <View style={{ flex: 1, padding: 16 }}>
                                            <Text style={[textStyle.title2, { color: colors.text }]}>{data.title}</Text>
                                            <Text style={[textStyle.body3, { color: colors.text, marginTop: 4 }]}>{data.content}</Text>
                                            <Text style={[textStyle.caption, { color: colors.text, marginTop: 12 }]}>{data.user?.nickname ? data.user?.nickname : "default"}</Text>
                                        </View>
                                        <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={PostPagerStyle.image} />
                                    </View>
                                </View>
                            ))}
                    </AnimatedPagerView>
                    , [dataList])
            }
        </View>
    )
}

const PostPagerStyle = StyleSheet.create({
    titleArea: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    image: {
        aspectRatio: 1,
    }
})

export { PostPagerView }