import { useTheme } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Animated, Image, Text, View } from "react-native";
import PagerView, { PagerViewOnPageSelectedEventData } from "react-native-pager-view";
import textStyle from "../../../style/textStyle";

export declare type ImagePagerViewProps = {
    images: string[]
}

const ImagePagerView = (props: ImagePagerViewProps) => {
    const { colors } = useTheme()
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const [activePage, setActivePage] = useState(0)
    const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

    return (
        <View style={{ width: "100%", aspectRatio: 1, backgroundColor: colors.card }}>
            {useMemo(() =>
                <AnimatedPagerView onPageScroll={Animated.event<PagerViewOnPageSelectedEventData>(
                    [{
                        nativeEvent: {
                            position: positionAnimatedValue,
                        }
                    }],
                    {
                        listener: ({ nativeEvent: { position } }) => {
                            setActivePage(position)
                        },
                        useNativeDriver: true
                    }
                )} style={{ height: "100%", width: "100%" }}>
                    {
                        props.images.map((data, index) => (
                            <View style={{ height: "100%", width: "100%" }} collapsable={false} key={`storyImage_${index}`}>
                                <Image source={{ uri: data }} style={{ height: "100%", width: "100%" }} />
                            </View>
                        ))
                    }
                </AnimatedPagerView>
                , [props.images])}

            <View style={{ padding: 8, backgroundColor: "#000000", position: "absolute", bottom: 0, right: 0 }}>
                <Text style={[textStyle.caption, { color: "#ffffff" }]}>{`${activePage + 1}/${props.images.length}`}</Text>
            </View>

        </View>
    )
}

export { ImagePagerView }