import { StyleSheet } from "react-native";

const ContainerStyle = StyleSheet.create({
    container : {
        flex : 1
    },
    toolbar : {
        flexDirection : "row",
        height : 56
    },
})

const stroke2Container = function(color : string) {
    return {
        borderColor : color,
        borderWidth : 2
    }
}

export {stroke2Container, ContainerStyle}