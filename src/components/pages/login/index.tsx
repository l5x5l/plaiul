import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginParamList } from "../../../type/navigate/types";
import { LoginScreen } from "./login";
import { SignUpScreen } from "./signup";
import { SignUpAuthScreen } from "./signup_auth";
import { SignUpEmailScreen } from "./signup_email";
import { SignUpNicknameScreen } from "./signup_nickname";
import { SignUpPasswordScreen } from "./signup_password";
import { SignUpTermScreen } from "./signup_term";

const LoginHome = () => {

    const Stack = createNativeStackNavigator<LoginParamList>()

    return (
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="Email" component={SignUpEmailScreen}/>
            <Stack.Screen name="Auth" component={SignUpAuthScreen}/>
            <Stack.Screen name="Password" component={SignUpPasswordScreen}/>
            <Stack.Screen name="Nickname" component={SignUpNicknameScreen}/>
            <Stack.Screen name="Term" component={SignUpTermScreen}/>
        </Stack.Navigator>
    )
}

export {LoginHome}