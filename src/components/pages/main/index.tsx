import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../../atoms/logo";
import { CommunityScreen } from "./community";
import { HomeScreen } from "./home";
import { MyPageScreen } from "./mypage";
import { TipScreen } from "./tip";

const Main = () => {
    const Tab = createBottomTabNavigator()
    const {colors} = useTheme()

    return (
        <SafeAreaView style={{flex : 1}}>
            <View style={{flex : 1}}>
                <Logo/>
                <Tab.Navigator screenOptions={{headerShown:false}}>
                    <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon:({focused}) => (
                        <Image style={{height : 24, width : 24, tintColor : colors.border}} source={focused ? require("../../../assets/images/home_fill_24.png") : require("../../../assets/images/home_stroke_24.png")}/>
                    )}}/>
                    <Tab.Screen name="Community" component={CommunityScreen} options={{tabBarIcon:({focused}) => (
                        <Image style={{height : 24, width : 24, tintColor : colors.border}} source={focused ? require("../../../assets/images/community_fill_24.png") : require("../../../assets/images/community_stroke_24.png")}/>
                    )}}/>
                    <Tab.Screen name="Tip" component={TipScreen} options={{tabBarIcon:({focused}) => (
                        <Image style={{height : 24, width : 24, tintColor : colors.border}} source={focused ? require("../../../assets/images/tip_fill_24.png") : require("../../../assets/images/tip_stroke_24.png")}/>
                    )}}/>
                    <Tab.Screen name="MyPage" component={MyPageScreen} options={{tabBarIcon:({focused}) => (
                        <Image style={{height : 24, width : 24, tintColor : colors.border}} source={focused ? require("../../../assets/images/mypage_fill_24.png") : require("../../../assets/images/mypage_stroke_24.png")}/>
                    )}}/>
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    )
}

export { Main }