import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import textStyle from "../../../style/textStyle";

export declare type ConfirmModalProps = {
    mainText: string,
    cancelButtonText?: string,
    confirmButtonText?: string,
    confirmCallback: () => void,
    isShow: boolean,
    setIsShow: (isShow: boolean) => void
}

const ConfirmModal = (props: ConfirmModalProps) => {
    const { colors } = useTheme()

    return (
        <Modal
            animationType='none'
            visible={props.isShow}
            transparent={true}
            onRequestClose={() => {
                props.setIsShow(false)
            }}>
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "center", justifyContent: "center" }}>
                <View style={{ backgroundColor: colors.background, borderRadius: 16, padding: 16 }}>
                    <Pressable onPress={() => { props.setIsShow(false) }}>
                        <Image source={require("../../../assets/images/cancel_24.png")} style={{ height: 24, width: 24, padding: 12, tintColor: colors.border }} />
                    </Pressable>
                    <Text style={[textStyle.headline2, { color: colors.text, padding : 40 }]}>{props.mainText}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Pressable style={{marginEnd : 4, flex : 1}} onPress={() => {props.setIsShow(false)}}>
                            <View style={{borderWidth : 1, borderColor : colors.border, borderRadius : 16, alignItems :"center", justifyContent : "center"}}>
                                <Text style={[textStyle.button, {color : colors.text, paddingVertical : 16, paddingHorizontal : 16}]}>{props.cancelButtonText ? props.cancelButtonText : "취소하기"}</Text>
                            </View>
                        </Pressable>
                        <Pressable style={{marginStart : 4, flex : 1}} onPress={() => {
                            props.confirmCallback()
                            props.setIsShow(false)
                        }}>
                            <View style={{borderRadius : 16, backgroundColor : colors.card, alignItems :"center", justifyContent : "center"}}>
                                <Text style={[textStyle.button, {color : colors.text, paddingVertical : 16, paddingHorizontal : 16}]}>{props.confirmButtonText ? props.confirmButtonText : "계속하기"}</Text>
                            </View>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    )
}
export {ConfirmModal}