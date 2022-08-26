import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import textStyle from "../../../../style/textStyle";

const HomeScreen = () => {
    const {colors} = useTheme();

    return (
        <View style={HomeStyle.homeContainer}>
            <Text style={[textStyle.headline2, {color : colors.text}]}>Grower's Tip</Text>
            <View style={HomeStyle.growersTipArea}></View>
            <Text style={[textStyle.title1, {color : colors.text, marginTop : 56}]}>인기 게시글</Text>
        </View>
    )
}

const HomeStyle = StyleSheet.create({
    homeContainer : {
        paddingBottom : 16,
        paddingHorizontal : 16,
        flex : 1
    },
    growersTipArea : {
        flexDirection : "row",
        height : 180,
        marginTop : 24
    }
})

export {HomeScreen}