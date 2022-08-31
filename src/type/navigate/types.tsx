import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Main : undefined,
    Story : {
        storyIdx : number
    }
}

type mainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">
type storyScreenProps = NativeStackScreenProps<RootStackParamList, "Story">

export type {RootStackParamList, mainScreenProps, storyScreenProps}