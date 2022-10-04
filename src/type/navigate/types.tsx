import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TipDeatilDto } from "../DTO/tipDto";
import { UserDto } from "../DTO/userDto";

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
        tipIdx : number,
        preview ?: boolean,
        tip ?: TipDeatilDto
    },
    StoryEdit : {
        storyIdx ?: number
    },
    Qna : {
        qnaIdx : number
    },
    QnaEdit : {
        qnaIdx ?: number
    },
    TipEdit : {
        tip ?: TipDeatilDto,
        modifySuccess ?: () => void
    },
    Report : {
        targetIdx : number,
        targetCommentIdx ?: number,
        category : "qna" | "story"
    },
    Splash : undefined,
    EditProfile : {
        userInfo : UserDto
    }
}

type mainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">
type storyScreenProps = NativeStackScreenProps<RootStackParamList, "Story">
type LoginHomeScreenProps = NativeStackScreenProps<RootStackParamList, "LoginHome">
type TipDeatilScreenProps = NativeStackScreenProps<RootStackParamList, "Tip">
type storyCommentScreenProps = NativeStackScreenProps<RootStackParamList, "StoryComment">
type storyEditScreenProps = NativeStackScreenProps<RootStackParamList, "StoryEdit">
type qnaScreenProps = NativeStackScreenProps<RootStackParamList, "Qna">
type qnaEditScreenProps = NativeStackScreenProps<RootStackParamList, "QnaEdit">
type tipEditScreenProps = NativeStackScreenProps<RootStackParamList, "TipEdit">
type reportScreenProps = NativeStackScreenProps<RootStackParamList, "Report">
type splashScreenProps = NativeStackScreenProps<RootStackParamList, "Splash">
type editProfileScreenProps = NativeStackScreenProps<RootStackParamList, "EditProfile">


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

export type {RootStackParamList, mainScreenProps, storyScreenProps, LoginHomeScreenProps, TipDeatilScreenProps, storyCommentScreenProps, storyEditScreenProps, qnaScreenProps, qnaEditScreenProps, tipEditScreenProps, reportScreenProps, splashScreenProps, editProfileScreenProps,
    LoginParamList, LoginScreenProps, SignUpScreenProps, SignUpEmailScreenProps, SignUpAuthScreenProps, SignUpNicknameScreenProps, SignUpTermScreenProps, SignUpPasswordScreenProps,
    MainTabParamList, CommunityTabScreenProps}