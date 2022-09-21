import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyle from "../../../style/textStyle";
import { storyEditScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { Line } from "../../atoms/line";
import { launchImageLibrary } from "react-native-image-picker"
import { postWriteStory } from "../../../api/stories";
import callNeedLoginApi from "../../../util/callNeedLogin";
import { Chip } from "../../atoms/chip";
import { PickedImage } from "../../atoms/pickedImage";

const StoryEditScreen = ({ route, navigation }: storyEditScreenProps) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [tagWrite, setTagWrite] = useState("")
    const { colors } = useTheme()
    const [images, setImage] = useState<any[]>([])

    const removeTag = (index: number) => {
        const temp = [...tags]
        temp.splice(index, 1)
        setTags(temp)
    }

    const addTag = () => {
        if (tags.length < 3) {
            setTags([...tags, tagWrite])
            setTagWrite("")
        }
    }

    const removePhoto = (index : number) => {
        const temp = [...images]
        temp.splice(index, 1)
        setImage(temp)
    }

    const checkUploadable = () => {
        return (title !== "" && content !== "" && images.length >= 1)
    }

    type photo = {
        uri: any,
        type: String,
        name: any
    }

    const writeStory = async () => {
        var body = new FormData()
        images.map((picture) => {
            var photo = {
                uri: picture.uri,
                type: "multipart/form-data",
                name: picture.fileName
            }
            body.append("images", photo)
        })
        tags.map((tag) => {
            body.append("tags", tag)
        })
        body.append("content", content)
        body.append("title", title)

        const result = await callNeedLoginApi(() => postWriteStory(body))
        console.log(JSON.stringify(result))
    }

    useEffect(() => {
        if (route.params.storyIdx) {
            console.log("modify version!")
        } else {
            console.log("create version!")
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <BackButton onPress={() => { navigation.goBack() }} margin={4} />
                        <Pressable onPress={async () => {
                            if (checkUploadable())
                                writeStory()
                            else
                                console.log("cannot upload story!")
                        }}>
                            <Text style={[textStyle.title2, { padding: 16, color: checkUploadable() ? colors.text : "#9EAAA4" }]}>작성하기</Text>
                        </Pressable>
                    </View>
                    <View style={{ paddingHorizontal: 16 }}>
                        <View style={{ flexDirection: "row", paddingVertical: 16, alignItems : "center" }}>
                            <Text style={[textStyle.title1, { color: colors.text }]}>제목</Text>
                            <TextInput placeholder="제목을 입력해주세요" value={title} onChangeText={setTitle} style={[textStyle.body2, { color: colors.text, marginStart: 16 }]} placeholderTextColor={"#9EAAA4"} />
                        </View>
                        <Line />
                        <TextInput placeholder="내용을 입력해주세요" value={content} onChangeText={setContent} style={[textStyle.body2, { color: colors.text, marginVertical: 16, minHeight: 200, width: "100%" }]} placeholderTextColor={"#9EAAA4"} multiline={true} />
                        <Line />
                        <View style={{ flexDirection: "row", marginTop: 16 }}>
                            <Text style={[textStyle.title1, { color: colors.text }]}>태그</Text>
                            <Text style={[textStyle.caption, { color: colors.text, marginStart: 16 }]}>엔터를 누르면 태그가 등록됩니다.</Text>
                        </View>
                        <TextInput placeholder="태그를 입력해주세요" style={[textStyle.body2, { color: colors.text, paddingVertical: 16 }]} placeholderTextColor={"#9EAAA4"} returnKeyType="done" onSubmitEditing={() => {
                            addTag()
                        }} value={tagWrite} onChangeText={setTagWrite} editable={tags.length < 3} multiline={false} />
                        <View style={{ flexDirection: "row" }}>
                            {
                                tags.map((item, idx) => (
                                    <Chip key={`${item}_tag_${idx}`} text={item} onDelete={removeTag} index={idx} />
                                ))
                            }
                        </View>
                        <Line marginTop={16} />
                        <View style={{ flexDirection: "row", marginTop: 16 }}>
                            <Text style={[textStyle.title1, { color: colors.text }]}>사진</Text>
                            <Text style={[textStyle.caption, { color: colors.text, marginStart: 16 }]}>최소 1장, 최대 3장 첨부 가능</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginVertical: 16 }}>
                            {
                                (images.length < 3) ?
                                    <Pressable onPress={async () => {
                                        const result = await launchImageLibrary({ mediaType: "photo", selectionLimit: (3 - images.length) })
                                        if (result.assets) {
                                            setImage([ ...images, ...result.assets])
                                        }

                                        console.log(JSON.stringify(result))
                                    }}>
                                        <View style={{ backgroundColor: "#9EAAA4", height: 80, width: 80, justifyContent : "center", alignItems : "center" }}>
                                            <Text style={[textStyle.headline1, {color : colors.background}]}>+</Text>
                                        </View>
                                    </Pressable> : null
                            }
                            {
                                images.map((item, idx) => (
                                    <PickedImage imageUri={item.uri} onDelete={removePhoto} index={idx}/>
                                ))
                            }


                        </View>
                    </View>


                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export { StoryEditScreen }