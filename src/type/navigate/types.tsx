import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Main : undefined,
    Story : {
        storyIdx : number
    },
    StoryComment : {
        storyIdx : number
    },
    LoginHome : undefined,
    Tip : {
        tipIdx : number
    },
    StoryEdit : {
        storyIdx ?: number
    }
}

type mainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">
type storyScreenProps = NativeStackScreenProps<RootStackParamList, "Story">
type LoginHomeScreenProps = NativeStackScreenProps<RootStackParamList, "LoginHome">
type TipDeatilScreenProps = NativeStackScreenProps<RootStackParamList, "Tip">
type storyCommentScreenProps = NativeStackScreenProps<RootStackParamList, "StoryComment">
type storyEditScreenProps = NativeStackScreenProps<RootStackParamList, "StoryEdit">


type LoginParamList = {
    Login : undefined,
    SignUp : undefined,
    Email : undefined,
    Auth : undefined,
    Nickname : undefined,
    Term : undefined,
    Password : undefined
}

type LoginScreenProps = NativeStackScreenProps<LoginParamList, "Login">
type SignUpScreenProps = NativeStackScreenProps<LoginParamList, "SignUp">
type SignUpEmailScreenProps = NativeStackScreenProps<LoginParamList, "Email">
type SignUpAuthScreenProps = NativeStackScreenProps<LoginParamList, "Auth">
type SignUpNicknameScreenProps = NativeStackScreenProps<LoginParamList, "Nickname">
type SignUpTermScreenProps = NativeStackScreenProps<LoginParamList, "Term">
type SignUpPasswordScreenProps = NativeStackScreenProps<LoginParamList, "Password">


type MainTabParamList = {
    Home : undefined,
    Community : undefined,
    Tip : undefined,
    MyPage : undefined
}

type CommunityTabScreenProps = BottomTabNavigationProp<MainTabParamList, "Community">

export type {RootStackParamList, mainScreenProps, storyScreenProps, LoginHomeScreenProps, TipDeatilScreenProps, storyCommentScreenProps, storyEditScreenProps,
    LoginParamList, LoginScreenProps, SignUpScreenProps, SignUpEmailScreenProps, SignUpAuthScreenProps, SignUpNicknameScreenProps, SignUpTermScreenProps, SignUpPasswordScreenProps,
    MainTabParamList, CommunityTabScreenProps}