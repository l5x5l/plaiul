import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserTipList } from "../../../api/user";
import textStyle from "../../../style/textStyle";
import { TipDto } from "../../../type/DTO/tipDto";
import { profileScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { Line } from "../../atoms/line";
import { ProfileView } from "../../blocks/profileView";
import TipView from "../../blocks/tipView";

const ProfileScreen = ({ route, navigation }: profileScreenProps) => {
    const [tipList, setTipList] = useState<TipDto[]>([])
    const [isRefresh, setIsRefresh] = useState(false)
    const nextCursor = useRef<string | undefined>(undefined)
    const isLast = useRef(false)
    const { colors } = useTheme()

    const refresh = async () => {
        nextCursor.current = undefined
        isLast.current = false
        const result = await getUserTipList(route.params.userInfo.userIdx, "recently", nextCursor.current)
        if (result.data) {
            setTipList(result.data)
        }
        setIsRefresh(false)
    }

    const load = async () => {
        if (isLast.current) return

        const result = await getUserTipList(route.params.userInfo.userIdx, "recently", nextCursor.current)
        if (result.data) {
            if (nextCursor === null)
                setTipList([...result.data])
            else
                setTipList([...tipList, ...result.data])

            if (result.meta?.nextCursor && result.meta?.nextCursor !== null) {
                nextCursor.current = result.meta.nextCursor
            } else {
                isLast.current = true
            }
        }
        console.log(JSON.stringify(result))
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <BackButton margin={4} onPress={() => { navigation.goBack() }} />
                <FlatList keyExtractor={(item, index) => `profile_${item.tipIdx}_${index}`} ListHeaderComponent={
                    <View style={{ paddingHorizontal: 16 }}>
                        <ProfileView userIdx={route.params.userInfo.userIdx} profile={route.params.userInfo.profile} nickname={route.params.userInfo.nickname} />
                        <Line marginBottom={16} />
                        <Text style={[textStyle.title1, { color: colors.text, marginVertical: 16 }]}>작성한 Tip</Text>
                    </View>
                } renderItem={({ item }) =>
                    <TipView tip={item} onClick={() => { navigation.push( "Tip", {tipIdx : item.tipIdx}) }} />
                } data={tipList} onEndReachedThreshold={0.8} onEndReached={() => { load() }} refreshing={isRefresh} onRefresh={() => { refresh() }} />
            </View>
        </SafeAreaView>
    )
}

export { ProfileScreen }