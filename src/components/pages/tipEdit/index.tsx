import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { postWriteTip } from "../../../api/tip";
import textStyle from "../../../style/textStyle";
import { tipContent } from "../../../type/data/tipContent";
import { DefaultUserDto } from "../../../type/DTO/userDto";
import { tipEditScreenProps } from "../../../type/navigate/types";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { BackButton } from "../../atoms/backButton";
import { Line } from "../../atoms/line";
import { TipContentImage } from "../../blocks/tipContentImage";
import { TipContentText } from "../../blocks/tipContentText";
import { photo } from "../../../type/data/tipContent"
import { launchImageLibrary } from "react-native-image-picker";

const TipEditScreen = ({ navigation, route }: tipEditScreenProps) => {
    const { colors } = useTheme()
    const [title, setTitle] = useState("")
    const [thumbnail, setThumbnail] = useState<photo>()
    const [tipContents, setTipContents] = useState<tipContent[]>([])

    const currentKey = useRef(0)

    const addImageContent = () => {
        setTipContents([...tipContents, { data: { uri: "", fileName: "" }, key: currentKey.current++ }])
    }

    const addTextContent = () => {
        setTipContents([...tipContents, { data: "", key: currentKey.current++ }])
    }

    const updateTextContentValue = (itemId: number, text: string) => {
        const temp = [...tipContents]
        const targetItem = temp.find((item) => item.key === itemId)
        if (targetItem !== undefined) {
            targetItem.data = text
            setTipContents(temp)
        }
    }

    const updateImageContentValue = (itemId: number, imageData: { uri: string, fileName: string }) => {
        const temp = [...tipContents]
        const targetItem = temp.find((item) => item.key === itemId)
        if (targetItem !== undefined) {
            targetItem.data = {
                uri: imageData.uri,
                fileName: imageData.fileName
            }
            setTipContents(temp)
        }
    }

    const removeContent = (itemId: number) => {
        const temp = [...tipContents]
        const targetItem = temp.find((item) => item.key === itemId)


        if (targetItem !== undefined) {
            const targetIdx = temp.indexOf(targetItem)
            if (targetIdx !== undefined) {
                temp.splice(targetIdx, 1)
            }
            setTipContents(temp)
        }
    }

    const uploadTip = async () => {
        const body = new FormData()
        body.append("title", title)
        body.append("thumbnail", { uri: thumbnail?.uri, type: "multipart/form-data", name: thumbnail?.fileName })
        tipContents.map((data) => {
            if (typeof data.data === "string") {
                body.append("textList", data.data)
                body.append("orderList", 0)
            } else {
                body.append("imageList", { uri: data.data.uri, type: "multipart/form-data", name: data.data.fileName })
                body.append("orderList", 1)
            }
        })
        const response = await callNeedLoginApi(() => postWriteTip(body))
        if (response?.data?.tipIdx) {
            navigation.goBack()
        } else {
            console.log(JSON.stringify(response))
        }
    }

    const movePosition = (up: boolean, itemId: number) => {
        const temp = [...tipContents]
        const targetItem = temp.find((item) => item.key === itemId)

        if (targetItem !== undefined) {
            const targetIdx = temp.indexOf(targetItem)
            if (targetIdx !== undefined) {
                if (targetIdx >= temp.length - 1 && !up) return
                if (targetIdx === 0 && up) return
                if (!up) {
                    temp.splice(targetIdx, 1)
                    temp.splice(targetIdx + 1, 0, targetItem)
                } else {
                    temp.splice(targetIdx, 1)
                    temp.splice(targetIdx - 1, 0, targetItem)
                }
                setTipContents(temp)
            }
        }
    }

    const preview = () => {
        navigation.push("Tip", {
            tipIdx: -1, preview: true, tip: {
                tipIdx: -1,
                title: title,
                thumbnail: thumbnail?.uri ? thumbnail.uri : "https://reactnative.dev/img/tiny_logo.png",
                isLiked: false,
                likeCnt: 0,
                createdAt: "",
                user: DefaultUserDto,
                content: tipContents.map(data => (typeof (data.data) === "string" ? { type: 1, text: data.data } : { type: 2, image: data.data.uri }))
            }
        })
    }

    const selectThumbnail = () => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (response.assets != undefined) {
                const uri = (response.assets[0].uri === undefined) ? "" : response.assets[0].uri
                const filename = (response.assets[0].fileName === undefined) ? "" : response.assets[0].fileName

                setThumbnail({ uri: uri, fileName: filename })
            }
        });
    }
    const checkUploadable = () => {
        return (title !== "" && thumbnail !== undefined && tipContents.length >= 1)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <BackButton onPress={() => { navigation.goBack() }} margin={4} />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Pressable onPress={preview}>
                                <Text style={[textStyle.title2, { color: colors.text, paddingVertical: 4, paddingHorizontal: 8 }]}>미리보기</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                if (checkUploadable())
                                    uploadTip()
                            }}>
                                <Text style={[textStyle.title2, { color: checkUploadable() ? colors.text : "#9EAAA4", paddingVertical: 4, paddingHorizontal: 8, marginEnd: 8 }]}>작성하기</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 16 }}>
                        <View style={{ flexDirection: "row", paddingVertical: 16, alignItems: "center" }}>
                            <Text style={[textStyle.title1, { color: colors.text }]}>제목</Text>
                            <TextInput placeholder="제목을 입력해주세요" value={title} onChangeText={setTitle} style={[textStyle.body2, { color: colors.text, marginStart: 16 }]} placeholderTextColor={"#9EAAA4"} />
                        </View>
                        <Line />
                        <View style={{ flexDirection: "row", marginVertical: 16, justifyContent: "space-between" }}>
                            <Text style={[textStyle.title1, { color: colors.text }]}>대표 이미지 선택</Text>
                            <Pressable style={{ marginEnd: 8 }} onPress={() => { selectThumbnail() }}>
                                <Image source={{ uri: thumbnail?.uri }} style={{ height: 80, width: 80, backgroundColor: colors.card }} />
                            </Pressable>
                        </View>
                        <Line />
                        <Text style={[textStyle.title1, { color: colors.text, marginTop: 24 }]}>본문 내용</Text>
                        {
                            tipContents.map((data, index) => (
                                typeof (data.data) === "string" ?
                                    <TipContentText key={`text_${data.key}`} itemId={data.key} changeFunction={(key: number, value: string) => {
                                        updateTextContentValue(key, value)
                                    }} removeFuction={(key: number) => {
                                        removeContent(key)
                                    }} moveFunction={(up: boolean, key: number) => {
                                        movePosition(up, key)
                                    }} />
                                    :
                                    <TipContentImage key={`image_${data.key}`} itemId={data.key} removeFuction={(key: number) => {
                                        removeContent(key);
                                    }} imageUri={data.data.uri} moveFunction={(up: boolean, key: number) => {
                                        movePosition(up, key);
                                    }} changeFunction={function (key: number, value: { uri: string; fileName: string; }): void {
                                        updateImageContentValue(key, { uri: value.uri, fileName: value.fileName })
                                    }} />
                            ))
                        }
                        <Pressable style={{ marginTop: 16 }} onPress={() => { addTextContent() }}>
                            <View style={{ borderWidth: 1, borderColor: colors.border, justifyContent: "center" }}>
                                <Text style={[textStyle.title2, { color: "#9EAAA4", padding: 16 }]}>+ 글 영역 추가하기</Text>
                            </View>
                        </Pressable>
                        <Pressable style={{ marginTop: 16 }} onPress={() => { addImageContent() }}>
                            <View style={{ borderWidth: 1, borderColor: colors.border, justifyContent: "center" }}>
                                <Text style={[textStyle.title2, { color: "#9EAAA4", padding: 16 }]}>+ 사진 영역 영역 추가하기</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export { TipEditScreen }