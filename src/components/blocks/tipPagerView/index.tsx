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

    if (props.screen === "home") {
        return (
            <View>
                <View style={TipPagerViewStyle.rowContainer}>
                    <Text style={[textStyle.headline2, { color: theme.colors.text, marginStart: 16 }]}>Grower's Tip</Text>
                    <Pressable style={{ padding: 8 }}>
                        <Text style={[textStyle.body3, { color: theme.colors.text }]}>전체보기</Text>
                    </Pressable>
                </View>
                <View style={[TipPagerViewStyle.rowContainer, { marginTop: 24 }]}>
                    {
                        useMemo(() =>
                            <View style={{ justifyContent: "flex-end", marginHorizontal: 12 }}>
                                {
                                    props.tipList.map((_, index) => (
                                        <Leaf isSelected={(index) === activePage} color={theme.colors.text} key={`homeTipCount_${index}`}></Leaf>
                                    ))
                                }

                            </View>
                            , [props.tipList, activePage])
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
                                    props.tipList.map((data, index) => (
                                        <View style={{ flex: 1 }} collapsable={false} key={`homeTip_${index}`}>
                                            <Image style={{ flex: 1 }} source={{ uri: data.thumbnail }} />
                                            <View style={TipPagerViewStyle.imageFilter} />
                                            <View style={TipPagerViewStyle.tipTextArea}>
                                                <Text numberOfLines={2} style={[textStyle.headline2, { color: '#D9CCB9' }]}>{data.title}</Text>
                                                <Text style={[textStyle.title2, { marginTop: 8, color: '#D9CCB9' }]}>{data.user.nickname}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </AnimagedPagerView>
                            , [props.tipList])
                    }
                </View>
            </View>
        )
    } 
    else {
        return (
            <View>
                <View style={[TipPagerViewStyle.rowContainer, {justifyContent : "space-between"}]}>
                    <View style={{flexDirection : "row", alignItems : "flex-end"}}>
                        <Text style={[textStyle.headline2, { color: theme.colors.text, marginStart: 16 }]}>BestTip</Text>
                        <Text style={[textStyle.body3, { color: theme.colors.text, marginStart : 8 }]}>{`${activePage + 1}/${props.tipList.length}`}</Text>
                    </View>
                    {
                        useMemo(() =>
                            <View style={{ alignSelf: "flex-end", marginHorizontal: 12, flexDirection : "row" }}>
                                {
                                    props.tipList.map((_, index) => (
                                        <Leaf isSelected={(index) === activePage} color={theme.colors.text} key={`homeTipCount_${index}`}></Leaf>
                                    ))
                                }

                            </View>
                            , [props.tipList, activePage])
                    }
                </View>
                <View style={{ marginTop: 16, paddingHorizontal : 16 }}>
                    {
                        useMemo(() =>
                            <AnimagedPagerView style={{width : "100%", aspectRatio : 1}} pageMargin={16} onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
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
                                    props.tipList.map((data, index) => (
                                        <View style={{ width : "100%", height : "100%",  borderColor : theme.colors.border, borderWidth : 2 }} collapsable={false} key={`Tip_${index}`}>
                                            <Image style={{ flex: 1 }} source={{ uri: data.thumbnail }} />
                                            <View style={TipPagerViewStyle.imageFilter} />
                                            <View style={TipPagerViewStyle.tipTextArea_growerTip}>
                                                <Text numberOfLines={2} style={[textStyle.headline1, { color: '#D9CCB9', marginBottom : 32}]}>{data.title}</Text>
                                                <Text style={[textStyle.title1, { color: '#D9CCB9' }]}>{data.user.nickname}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </AnimagedPagerView>
                            , [props.tipList])
                    }
                </View>
            </View>
        )
    }
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
    },
    tipTextArea_growerTip : {
        position : "absolute", left : 16, bottom : 16, right : 16
    }
})

export type { TipPagerViewProps }
export { TipPagerView }
