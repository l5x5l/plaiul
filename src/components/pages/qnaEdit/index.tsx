import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { patchModifyQna, postWriteQna } from "../../../api/qna";
import qnaSlice, { qnaSliceState } from "../../../redux/qna/qnaSlice";
import { rootState, store } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { qnaEditScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { BackButton } from "../../atoms/backButton";
import { Line } from "../../atoms/line";

const QnaEditScreen = ({ route, navigation }: qnaEditScreenProps) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { colors } = useTheme()

    const qna = useSelector<rootState, qnaSliceState>(state=>state.qna)
    const checkUploadable = () => {
        return (title !== "" && content !== "")
    }
    const action = qnaSlice.actions

    useEffect(() => {
        // 수정 모드인 경우 기존 데이터를 반영
        if (route.params.qnaIdx) { 
            setTitle(qna.value.title)
            setContent(qna.value.content)
        } 
    }, [])

    const modifyQna = async() => {
        const result = await callNeedLoginApi(() => patchModifyQna(title, content, route.params.qnaIdx!!))
        console.log(JSON.stringify(result))
        if (result?.data?.modified) {
            store.dispatch(action.setQna({title, content}))
            navigation.goBack()
        }
    }

    const writeQna = async() => {
        const result = await callNeedLoginApi(() => postWriteQna(title, content))
        if (result?.data?.qnaIdx) {
            navigation.goBack()
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <BackButton onPress={() => { navigation.goBack() }} margin={4} />
                        <Pressable onPress={async () => {
                            if (checkUploadable()) {
                                if (!route.params.qnaIdx) {
                                    writeQna()
                                } else {
                                    modifyQna()
                                }
                            }
                        }}>
                            <Text style={[textStyle.title2, { padding: 16, color: checkUploadable() ? colors.text : "#9EAAA4" }]}>작성하기</Text>
                        </Pressable>
                    </View>
                    <View style={{paddingHorizontal : 16}}>
                        <View style={{ flexDirection: "row", paddingVertical: 16, alignItems: "center" }}>
                            <Text style={[textStyle.title1, { color: colors.text }]}>제목</Text>
                            <TextInput placeholder="제목을 입력해주세요" value={title} onChangeText={setTitle} style={[textStyle.body2, { color: colors.text, marginStart: 16, flex : 1 }]} placeholderTextColor={"#9EAAA4"} />
                        </View>
                        <Line />
                        <TextInput placeholder="내용을 입력해주세요" value={content} onChangeText={setContent} style={[textStyle.body2, { color: colors.text, marginVertical: 16, minHeight: 200, width: "100%" }]} placeholderTextColor={"#9EAAA4"} multiline={true} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export { QnaEditScreen }