import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import textStyle from "../../../../style/textStyle";
import { TipDto } from "../../../../type/DTO/tipDto";
import { TipPagerView } from "../../../blocks/tipPagerView";
import  TipView  from "../../../blocks/tipView";

const TipScreen = () => {

    const { colors } = useTheme()
    var pageIdx = useRef(0)

    const [tipList, setTipList] = useState<TipDto[]>([])


    useEffect(() => {
        setPages();
    }, [])

    function getDatas(pageIdx : number) {
        return [
            {
                tipIdx: pageIdx,
                title: `${pageIdx}th Tip!`,
                thumbnail: "https://reactnative.dev/img/tiny_logo.png",
                user: {
                    userIdx: 0,
                    nickname: "probe"
                }
            },
            {
                tipIdx: pageIdx + 1,
                title: `${pageIdx + 1}th Tip!`,
                thumbnail: "https://reactnative.dev/img/tiny_logo.png",
                user: {
                    userIdx: 0,
                    nickname: "probe"
                }
            },
            {
                tipIdx: pageIdx + 2,
                title: `${pageIdx + 2}th Tip!`,
                thumbnail: "https://reactnative.dev/img/tiny_logo.png",
                user: {
                    userIdx: 0,
                    nickname: "probe"
                }
            }
        ]
    }

    function setPages(){
        pageIdx.current = pageIdx.current + 3
        const response = getDatas(pageIdx.current)
        setTipList([...tipList, ...response])
    }

    return (
        <View style={{ flex: 1 }}>
            {/* item하고 {(item)} 의 차이가 뭐여 */}
            <FlatList keyExtractor={item => item.tipIdx.toString()} data={tipList} renderItem={({ item }) =>
                <TipView tip={item} />
            } ListHeaderComponent={
                <View>
                    <TipPagerView tipClick={function (itemIdx: number): void {

                    }} screen={"tip"} tipList={[]} />
                    <Text style={[textStyle.headline3, { marginStart: 16, marginTop: 56, marginBottom: 16, color: colors.text }]}>전체 목록</Text>

                </View>
            } overScrollMode={"never"}
            onEndReachedThreshold={0.8} onEndReached={setPages}/>
        </View>
    )
}

export { TipScreen }