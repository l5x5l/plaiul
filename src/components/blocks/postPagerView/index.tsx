import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import PagerView, { PagerViewOnPageSelectedEventData } from "react-native-pager-view";
import { stroke2Container } from "../../../style/containerStyle";
import textStyle from "../../../style/textStyle";
import { PairPostDto } from "../../../type/DTO/postDto";
import { CommunityTabScreenProps, RootStackParamList } from "../../../type/navigate/types";
export declare type PostPagerViewProps = {
    title: string,
    posts: PairPostDto[]
}

const PostPagerView = (props: PostPagerViewProps) => {
    const { colors } = useTheme()
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const [activePage, setActivePage] = useState(0)

    const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)
    const navigator = useNavigation<CommunityTabScreenProps>()
    const postNavigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <View style={{ paddingHorizontal: 16, marginTop: 56, width: "100%", flex: 1 }}>
            <View style={PostPagerStyle.titleArea}>
                <View style={[PostPagerStyle.rowContainer, { alignItems: "flex-end" }]}>
                    <Text style={[textStyle.title1, { color: colors.text }]}>{props.title}</Text>
                    <Text style={[textStyle.body3, { marginStart: 8, color: colors.text }]}>{`${(activePage + 1)} / ${props.posts.length}`}</Text>
                </View>
                <View style={PostPagerStyle.rowContainer}>
                    <Pressable onPress={() => { navigator.navigate("Community") }}>
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
                            props.posts.map((data, index) => (
                                <View style={{ height: "100%", width: "100%", marginTop: 24 }} collapsable={false} key={`${props.title}_${index}`}>
                                    {data.top &&
                                        <Pressable onPress={() => {
                                            if (data.top?.storyIdx) {
                                                postNavigator.navigate("Story", { storyIdx: data.top.storyIdx })
                                            } else if (data.top?.qnaIdx) {
                                                postNavigator.navigate("Qna", { qnaIdx: data.top.qnaIdx })
                                            }
                                        }}>
                                            <View style={[PostPagerStyle.rowContainer, stroke2Container(colors.border)]}>
                                                <View style={{ flex: 1, padding: 16 }}>
                                                    <Text style={[textStyle.title2, { color: colors.text }]}>{data.top.title}</Text>
                                                    <Text style={[textStyle.body3, { color: colors.text, marginTop: 4 }]} numberOfLines={1}>{data.top.content}</Text>
                                                    <Text style={[textStyle.caption, { color: colors.text, marginTop: 12 }]}>{data.top.user?.nickname ? data.top.user?.nickname : "default"}</Text>
                                                </View>
                                                <Image source={{ uri: data.top.thumbnail }} style={PostPagerStyle.image} />
                                            </View>
                                        </Pressable>
                                    }
                                    {data.bottom &&
                                        <Pressable onPress={() => {
                                            if (data.bottom?.storyIdx) {
                                                postNavigator.navigate("Story", { storyIdx: data.bottom.storyIdx })
                                            } else if (data.bottom?.qnaIdx) {
                                                postNavigator.navigate("Qna", { qnaIdx: data.bottom.qnaIdx })
                                            }
                                        }}>
                                            <View style={[PostPagerStyle.rowContainer, stroke2Container(colors.border), { marginTop: 8 }]}>

                                                <View style={{ flex: 1, padding: 16 }}>
                                                    <Text style={[textStyle.title2, { color: colors.text }]}>{data.bottom.title}</Text>
                                                    <Text style={[textStyle.body3, { color: colors.text, marginTop: 4 }]} numberOfLines={1}>{data.bottom.content}</Text>
                                                    <Text style={[textStyle.caption, { color: colors.text, marginTop: 12 }]}>{data.bottom.user?.nickname ? data.bottom.user?.nickname : "default"}</Text>
                                                </View>
                                                <Image source={{ uri: data.bottom.thumbnail }} style={PostPagerStyle.image} />
                                            </View>
                                        </Pressable>
                                    }
                                </View>
                            ))}
                    </AnimatedPagerView>
                    , [props.posts])
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