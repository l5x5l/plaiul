import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LoginSlice from "../../../../redux/login/loginSlice";
import { rootState, rootDispatch } from "../../../../redux/store";
import { loadBestTip, loadTip, tipListSliceState } from "../../../../redux/tip/tipListSlice";
import textStyle from "../../../../style/textStyle";
import { RootStackParamList } from "../../../../type/navigate/types";
import { checkIsLogin } from "../../../../util/token";
import { TipPagerView } from "../../../blocks/tipPagerView";
import  TipView  from "../../../blocks/tipView";

export declare type TipScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Main", undefined>
}


const TipScreen = (props : TipScreenProps) => {

    const { colors } = useTheme()
    var pageIdx = useRef(0)

    const tipListInfo = useSelector<rootState, tipListSliceState>(state => state.tipList)
    const dispatch = useDispatch<rootDispatch>()
    const loginAction = LoginSlice.actions


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
                <TipView tip={item} onClick={() => {
                    props.navigation.push("Tip", {tipIdx : item.tipIdx})
                }}/>
            } ListHeaderComponent={
                <View>
                    <TipPagerView tipClick={function (itemIdx: number): void {
                        props.navigation.push("Tip", {tipIdx : itemIdx})
                    }} screen={"tip"} tipList={tipListInfo.bestData} />
                    <Text style={[textStyle.headline3, { marginStart: 16, marginTop: 56, marginBottom: 16, color: colors.text }]}>전체 목록</Text>

                </View>
            } overScrollMode={"never"}
            onEndReachedThreshold={0.8} onEndReached={setPages}/>
            <Pressable style={{ position: "absolute", bottom: 16, right: 16 }} onPress={async () => {
                const isLogin = await checkIsLogin()
                if (isLogin) {
                    props.navigation.push("TipEdit", {})
                } else {
                    dispatch(loginAction.callBottomSheet())
                }
            }}>
                <View style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: colors.card, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[textStyle.headline1, { color: colors.text }]}>+</Text>
                </View>
            </Pressable>
        </View>
    )
}

export { TipScreen }