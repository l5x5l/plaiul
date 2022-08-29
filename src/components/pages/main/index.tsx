import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../../atoms/logo";
import { CommunityScreen } from "./community";
import { HomeScreen } from "./home";
import { MyPageScreen } from "./mypage";
import { TipScreen } from "./tip";

const Main = () => {
    const Tab = createBottomTabNavigator()

    return (
        <SafeAreaView style={{flex : 1}}>
            <View style={{flex : 1}}>
                <Logo/>
                <Tab.Navigator screenOptions={{headerShown:false}}>
                    <Tab.Screen name="Home" component={HomeScreen}/>
                    <Tab.Screen name="Community" component={CommunityScreen}/>
                    <Tab.Screen name="Tip" component={TipScreen}/>
                    <Tab.Screen name="MyPage" component={MyPageScreen}/>
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    )
}

export { Main }