import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Modal, PanResponder, Platform, Pressable, StatusBar, View } from "react-native";

export declare type BottomSheetProps = {
    children: JSX.Element,
    isShow: boolean,
    setIsShow: (isShow: boolean) => void,
}

const BottomSheet = (props: BottomSheetProps) => {

    const {colors} = useTheme()
    const bottomSheetHeight = useRef(0)

    const screenHeight = Platform.OS === "android" ? Dimensions.get("window").height - StatusBar.currentHeight!! : Dimensions.get("window").height
    const panY = useRef(new Animated.Value(screenHeight)).current
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1]
    })
    const showBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
    })
    const hideBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true
    })
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (_, gestureState) => {
            panY.setValue(gestureState.dy)
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > bottomSheetHeight.current / 2) {
                props.setIsShow(false)
            } else {
                showBottomSheet.start()
            }
        }
    })).current

    useEffect(() => {
        if (props.isShow) {
            showBottomSheet.start()
        } else {
            hideBottomSheet.start()
        }
    }, [props.isShow])

    return (
        <Modal
            visible={props.isShow}
            animationType="fade"
            transparent={true}>

            <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
                <Pressable onPress={() => {
                    console.log("close!!")
                    console.log(`height ${bottomSheetHeight.current}`)
                    props.setIsShow(false)
                }} style={{flex : 1}}>
                    <View style={{ flex: 1 }} />
                </Pressable>
                <Animated.View style={{ backgroundColor: colors.background, borderTopRightRadius: 16, borderTopLeftRadius: 16, transform: [{ "translateY": translateY }] }} {...panResponder.panHandlers} onLayout={(event) => {bottomSheetHeight.current = event.nativeEvent.layout.height}}>
                    {props.children}
                </Animated.View>
            </View>

        </Modal>
    )
}

export { BottomSheet }