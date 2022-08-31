import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PostPagerView } from "../../../blocks/postPagerView";
import { TipPagerView } from "../../../blocks/tipPagerView";

const HomeScreen = () => {
    const {colors} = useTheme();

    return (
        <ScrollView style={HomeStyle.homeContainer}>
            <TipPagerView tipClick={function (itemIdx: number): void {
                
            } } screen={"home"} tipList={[]}></TipPagerView>
            <PostPagerView title={"인기 게시글"}/>
            <PostPagerView title={"최근 게시글"}/>
            <View style={{height : 56}}/>
        </ScrollView>
    )
}

const HomeStyle = StyleSheet.create({
    homeContainer : {
        flex : 1,
    },
    growersTipArea : {
        flexDirection : "row",
        height : 180,
        marginTop : 24
    }
})

export {HomeScreen}