import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginParamList } from "../../../type/navigate/types";
import { LoginScreen } from "./login";
import { SignUpScreen } from "./signup";

const LoginHome = () => {

    const Stack = createNativeStackNavigator<LoginParamList>()

    return (
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
        </Stack.Navigator>
    )
}

export {LoginHome}