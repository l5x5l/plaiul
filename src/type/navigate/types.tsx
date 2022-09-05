import { NavigationContainerProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Main : undefined,
    Story : {
        storyIdx : number
    },
    LoginHome : undefined
}

type mainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">
type storyScreenProps = NativeStackScreenProps<RootStackParamList, "Story">
type LoginHomeScreenProps = NativeStackScreenProps<RootStackParamList, "LoginHome">


type LoginParamList = {
    Login : undefined,
    SignUp : undefined,
    Email : undefined,
    Auth : undefined,
    Nickname : undefined,
    Term : undefined
}

type LoginScreenProps = NativeStackScreenProps<LoginParamList, "Login">
type SignUpScreenProps = NativeStackScreenProps<LoginParamList, "SignUp">
type SignUpEmailScreenProps = NativeStackScreenProps<LoginParamList, "Email">
type SignUpAuthScreenProps = NativeStackScreenProps<LoginParamList, "Auth">
type SignUpNicknameScreenProps = NativeStackScreenProps<LoginParamList, "Nickname">
type SignUpTermScreenProps = NativeStackScreenProps<LoginParamList, "Term">

export type {RootStackParamList, mainScreenProps, storyScreenProps, LoginHomeScreenProps,
    LoginParamList, LoginScreenProps, SignUpScreenProps, SignUpEmailScreenProps, SignUpAuthScreenProps, SignUpNicknameScreenProps, SignUpTermScreenProps}