import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker"
import textStyle from "../../../style/textStyle";

interface TipContentImageProps {
    itemId: number,
    changeFunction: (key: number, value: {uri : string, fileName : string}) => void,
    removeFuction: (key: number) => void,
    imageUri: string,
    moveFunction : (up : boolean, key : number) => void
}


const TipContentImage = ({ itemId, changeFunction, removeFuction, imageUri, moveFunction }: TipContentImageProps) => {

    const {colors} = useTheme()

    return (
        <View style={[imageBlockStyle.container, {borderColor : colors.border}]}>
            <View style={imageBlockStyle.toolbar}>
                <Text style={[textStyle.title2, {color : colors.text}]}>이미지 영역</Text>
                <View style={imageBlockStyle.buttonArea}>
                    <TouchableOpacity style={imageBlockStyle.textButton} onPress={() => {moveFunction(true, itemId)}}>
                        <Text style={[textStyle.title2, {color : colors.text}]}>up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={imageBlockStyle.textButton} onPress={() => {moveFunction(false, itemId)}}>
                        <Text style={[textStyle.title2, {color : colors.text}]}>down</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={imageBlockStyle.textButton} onPress={() => { removeFuction(itemId) }}>
                        <Text style={[textStyle.title2, {color : colors.text}]}>del</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={imageBlockStyle.imageButton} onPress={() => {
                launchImageLibrary({ mediaType: "photo" }, (response) => {
                    if (response.assets != undefined) {
                        const uri = (response.assets[0].uri === undefined) ? "" : response.assets[0].uri
                        const filename = (response.assets[0].fileName === undefined) ? "" : response.assets[0].fileName

                        changeFunction(itemId, {uri : uri, fileName : filename})
                    }
                });
            }}>
                 <Image style={[imageBlockStyle.image, {backgroundColor : colors.card}]} source={{ uri: imageUri === "" ? undefined : imageUri }}></Image>
            </TouchableOpacity>
           
        </View>
    )
}

const imageBlockStyle = StyleSheet.create({
    container: {
        width: "100%",
        padding: 16,
        borderWidth: 1,
        marginTop : 16
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonArea: {
        display: "flex",
        flexDirection: "row"
    },
    textButton: {
        padding: 8,
        marginHorizontal: 4
    },
    imageButton: {
        height: 96,
        width: 96
    },
    image: {
        height: 96,
        width: 96
    }
})

export { TipContentImage }