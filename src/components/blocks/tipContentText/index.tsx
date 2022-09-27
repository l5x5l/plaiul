import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import React  from 'react';
import { useTheme } from "@react-navigation/native";
import textStyle from "../../../style/textStyle";

interface TipContentTextProps {
    itemId : number,
    changeFunction : (key : number, value : string) => void,
    removeFuction : (key : number) => void,
    moveFunction : (up : boolean, key : number) => void
}

const TipContentText = ({itemId, changeFunction, removeFuction, moveFunction} : TipContentTextProps) => {

    const {colors} = useTheme()

    return (
        <View style={[tipContentStyle.container, {borderColor : colors.border}]}>
            <View style={tipContentStyle.toolbar}>
                <Text style={[textStyle.title2, {color : colors.text}]}>글 영역</Text>
                <View style={tipContentStyle.buttonArea}>
                    <TouchableOpacity style={tipContentStyle.textButton} onPress={() => {moveFunction(true, itemId)}}>
                        <Text style={[textStyle.title2, {color : colors.text}]}>up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tipContentStyle.textButton} onPress={() => {moveFunction(false, itemId)}}>
                        <Text style={[textStyle.title2, {color : colors.text}]}>down</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tipContentStyle.textButton} onPress={() => {removeFuction(itemId)}}>
                        <Text style={[textStyle.title2, {color : colors.text}]}>del</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TextInput style={[tipContentStyle.textInput, textStyle.body2, {color : colors.text}]} multiline={true} onChangeText={(text) => {changeFunction(itemId, text)}} placeholder="input text..."/>
        </View>
    )
}

export { TipContentText }

const tipContentStyle = StyleSheet.create({
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
    textButton : {
        padding : 8,
        marginHorizontal : 4
    },
    textInput : {
        minHeight : 112
    }
})