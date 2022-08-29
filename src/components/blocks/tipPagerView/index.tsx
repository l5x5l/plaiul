import { useTheme } from "@react-navigation/native";
import React, { useMemo, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import PagerView, { PagerViewOnPageScrollEventData } from "react-native-pager-view";
import textStyle from "../../../style/textStyle";
import { TipDto } from "../../../type/DTO/tipDto";
import { Leaf } from "../../atoms/leaf";


type TipPagerViewProps = {
    tipClick: (itemIdx: number) => void,
    screen: "home" | "tip",
    tipList: TipDto[]
}

const AnimagedPagerView = Animated.createAnimatedComponent(PagerView)

const TipPagerView = (props: TipPagerViewProps) => {

    const theme = useTheme()
    const [activePage, setActivePage] = useState(0);
    const positionAnimatedValue = useRef(new Animated.Value(0)).current;
    const offsetAnimatedValue = useRef(new Animated.Value(0)).current;

    const [tipList, setTipList] = useState<TipDto[]>([{
        tipIdx: 0,
        title: "title 0",
        thumbnail: "",
        user: {
            userIdx: 0,
            nickname: "userName1"
        },
    }, {
        tipIdx: 1,
        title: "title 1",
        thumbnail: "",
        user: {
            userIdx: 0,
            nickname: "userName1"
        },
    }, {
        tipIdx: 2,
        title: "title 2",
        thumbnail: "",
        user: {
            userIdx: 0,
            nickname: "userName2"
        },
    }])

    return (
        <View>
            <View style={TipPagerViewStyle.rowContainer}>
                <Text style={[textStyle.headline2, { color: theme.colors.text, marginStart: 12 }]}>Grower's Tip</Text>
                <Pressable style={{ padding: 8 }}>
                    <Text style={[textStyle.body3, { color: theme.colors.text }]}>전체보기</Text>
                </Pressable>
            </View>
            <View style={[TipPagerViewStyle.rowContainer, { marginTop: 24 }]}>
                {
                    useMemo(() =>
                        <View style={{ justifyContent: "flex-end", marginHorizontal: 12 }}>
                            {
                                tipList.map((_, index) => (
                                    <Leaf isSelected={(index) === activePage} color={theme.colors.text} key={`homeTipCount_${index}`}></Leaf>
                                ))
                            }

                        </View>
                        , [tipList, activePage])
                }
                {
                    useMemo(() =>
                        <AnimagedPagerView style={TipPagerViewStyle.tipContainer} onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
                            [{
                                nativeEvent: {
                                    offset: offsetAnimatedValue,
                                    position: positionAnimatedValue,
                                },
                            },],
                            {
                                listener: ({ nativeEvent: { offset, position } }) => {
                                    const idx = Math.round(offset + position)
                                    setActivePage(idx)
                                },
                                useNativeDriver: true,
                            }
                        )}>
                            {
                                tipList.map((data, index) => (
                                    <View style={{ flex: 1 }} collapsable={false} key={`homeTip_${index}`}>
                                        <Image style={{ flex: 1 }} source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} />
                                        <View style={TipPagerViewStyle.imageFilter} />
                                        <View style={TipPagerViewStyle.tipTextArea}>
                                            <Text numberOfLines={2} style={[textStyle.headline2, { color: '#D9CCB9' }]}>{data.title}</Text>
                                            <Text style={[textStyle.title2, { marginTop: 8, color: '#D9CCB9' }]}>{data.user.nickname}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </AnimagedPagerView>
                        , [tipList])
                }
            </View>
        </View>
    )
}

const TipPagerViewStyle = StyleSheet.create({
    rowContainer: {
        flexDirection: "row"
    },
    tipContainer: {
        flex: 1,
        height: 180
    },
    imageFilter: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "absolute"
    },
    tipTextArea: {
        position: "absolute", top: 48, left: 20, right: 20
    },
    pageDotArea: {
        paddingHorizontal: 12
    },
    pageDot: {
        height: 24,
        width: 24
    }
})

export type { TipPagerViewProps }
export { TipPagerView }
