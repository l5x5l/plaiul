import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { rootState, rootDispatch } from "../../../../redux/store";
import { loadBestTip, loadTip, tipListSliceState } from "../../../../redux/tip/tipListSlice";
import textStyle from "../../../../style/textStyle";
import { TipPagerView } from "../../../blocks/tipPagerView";
import  TipView  from "../../../blocks/tipView";

const TipScreen = () => {

    const { colors } = useTheme()
    var pageIdx = useRef(0)

    const tipListInfo = useSelector<rootState, tipListSliceState>(state => state.tipList)
    const dispatch = useDispatch<rootDispatch>()


    useEffect(() => {
        setPages();
        dispatch(loadBestTip())
    }, [])

    function setPages(){
        if (!tipListInfo.isLast)
            dispatch(loadTip(tipListInfo.cursor))
    }

    return (
        <View style={{ flex: 1 }}>
            {/* item하고 {(item)} 의 차이가 뭐여 */}
            <FlatList keyExtractor={item => item.tipIdx.toString()} data={tipListInfo.pagingData} renderItem={({ item }) =>
                <TipView tip={item} />
            } ListHeaderComponent={
                <View>
                    <TipPagerView tipClick={function (itemIdx: number): void {

                    }} screen={"tip"} tipList={tipListInfo.bestData} />
                    <Text style={[textStyle.headline3, { marginStart: 16, marginTop: 56, marginBottom: 16, color: colors.text }]}>전체 목록</Text>

                </View>
            } overScrollMode={"never"}
            onEndReachedThreshold={0.8} onEndReached={setPages}/>
        </View>
    )
}

export { TipScreen }