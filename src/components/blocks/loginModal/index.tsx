import { useNavigation, useTheme } from "@react-navigation/native"
import React, { useState } from "react"
import { Image, Modal, Pressable, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import LoginSlice, { loginSliceState } from "../../../redux/login/loginSlice"
import { rootDispatch, rootState } from "../../../redux/store"
import textStyle from "../../../style/textStyle"

// redux 적용 예정
const LoginModal = () => {

    const { colors } = useTheme()
    const navigation = useNavigation() as any // 아니 이거 왜 됨?
    const isShow = useSelector<rootState, boolean>(state => state.login.isShowLoginBottomSheet)
    const action = LoginSlice.actions
    const dispatch = useDispatch<rootDispatch>()

    return (
        <Modal
            animationType='none'
            visible={isShow}
            transparent={true}
            onRequestClose={() => {
                dispatch(action.closeBottomSheet())
            }}>
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "center", justifyContent: "center"}}>
                <View style={{ backgroundColor: colors.background, borderRadius: 16, padding : 16  }}>
                    <Pressable onPress={() => { dispatch(action.closeBottomSheet()) }}>
                        <Image source={require("../../../assets/images/cancel_24.png")} style={{ height: 24, width: 24, padding: 12, tintColor: colors.border }} />
                    </Pressable>

                    <Text style={[textStyle.headline2, { color: colors.text, textAlign: "center", marginTop : 56, marginHorizontal : 36 }]}>{"로그인이 필요한\n서비스입니다"}</Text>
                    <Pressable onPress={() => { 
                        navigation.navigate('LoginHome') 
                        dispatch(action.closeBottomSheet())
                        }}>
                        <Text style={[textStyle.body2, { color: colors.text, marginTop: 112, textAlign: "center", marginBottom : 24 }]}>로그인 화면으로 이동</Text>
                    </Pressable>
                </View>
            </View>

        </Modal>
    )
}
export { LoginModal }