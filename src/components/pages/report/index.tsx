import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { reportResult } from "../../../api";
import { reportQna, reportQnaComment } from "../../../api/qna";
import { reportStory, reportStoryComment } from "../../../api/stories";
import textStyle from "../../../style/textStyle";
import { reportScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { BackButton } from "../../atoms/backButton";
import { StyledButton } from "../../atoms/button";
import { CheckBox } from "../../atoms/checkbox";

const ReportScreen = ({ route, navigation }: reportScreenProps) => {
    const { colors } = useTheme()
    const [ispending, setIsPending] = useState(false)
    const [selectedReasonIdx, setSeletedReasonIdx] = useState<number>()
    const [reasonText, setReasonText] = useState("")

    const reportReasons = ["욕설 및 비방", "홍보 및 영리목적", "불법 정보", "음란 및 청소년 유해", "개인정보 노출 및 유포", "도배 및 스팸", "직접 작성 (150자 이내)"]

    const checkReportable = () => {
        return (selectedReasonIdx !== undefined && (selectedReasonIdx <= 6 || (selectedReasonIdx === 7 && reasonText !== "")))
    }

    const checkReason = (idx: number) => {
        if (selectedReasonIdx === idx) {
            setSeletedReasonIdx(undefined)
        } else {
            setSeletedReasonIdx(idx)
        }
    }

    const setText = (text: string) => {
        if (text.length <= 150) {
            setReasonText(text)
        }
    }

    const report = async () => {
        let result
        if (route.params.category === "story") {
            if (route.params.targetCommentIdx) {
                result = await callNeedLoginApi<reportResult, undefined>(() => reportStoryComment(route.params.targetIdx, route.params.targetCommentIdx!!, selectedReasonIdx!!, reasonText))
            } else {
                result = await callNeedLoginApi<reportResult, undefined>(() => reportStory(route.params.targetIdx, selectedReasonIdx!!, reasonText))
            }
        }
        else if (route.params.category === "qna") {
            if (route.params.targetCommentIdx) {
                result = await callNeedLoginApi<reportResult, undefined>(() => reportQnaComment(route.params.targetIdx, route.params.targetCommentIdx!!, selectedReasonIdx!!, reasonText))
            } else {
                result = await callNeedLoginApi<reportResult, undefined>(() => reportQna(route.params.targetIdx, selectedReasonIdx!!, reasonText))
            }
        }
        setIsPending(false)
        if (result?.data?.reported) {
            navigation.goBack()
        } else {
            console.log(JSON.stringify(result))
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <BackButton onPress={() => { navigation.goBack() }} margin={4} />
                <ScrollView style={{ flex: 1, paddingHorizontal: 24 }}>
                    <Text style={[textStyle.headline2, { color: colors.text, marginTop: 24, marginBottom: 16 }]}>신고 사유</Text>
                    {
                        reportReasons.map((data, index) => (
                            <Pressable style={{ marginTop: 16 }} key={`checkbox_${index}`} onPress={() => { checkReason(index + 1) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <CheckBox style={"fill"} isChecked={selectedReasonIdx === index + 1} />
                                    <Text style={[textStyle.body2, { color: colors.text, marginStart: 16 }]}>{data}</Text>
                                </View>
                            </Pressable>
                        ))
                    }
                    <TextInput placeholder="사유를 입력해주세요" onChangeText={setText} value={reasonText} style={[textStyle.body2, { color: colors.text, marginTop: 16, borderColor: colors.border, borderWidth: 1, paddingHorizontal: 16, paddingBottom: 36, paddingTop: 12, minHeight: 150 }]} placeholderTextColor={"#9EAAA4"} multiline={true} />
                    <Text style={[textStyle.body2, { color: colors.text, position: "absolute", bottom: 16, right: 16 }]}>{`${reasonText.length}/150`}</Text>
                </ScrollView>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <StyledButton onClick={
                        async () => {
                            setIsPending(true)
                            report()
                        }
                    } style={"background"} text={"신고하기"} height={56} enable={checkReportable() && !ispending} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export { ReportScreen }