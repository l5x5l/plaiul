import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../style/textStyle";

const Main = () => {
    return (
        <SafeAreaView>
            <View>
                <Text style={textStyle.headline1}>Hello!</Text>
            </View>
        </SafeAreaView>
    )
}

export { Main }