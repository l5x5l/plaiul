import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import textStyle from "../../../style/textStyle";
import { UserDto } from "../../../type/DTO/userDto";

const ProfileView = (props : UserDto) => {

    const {colors} = useTheme()

    return (
        <View style={{flexDirection : "row", flex : 1, marginVertical : 24, alignItems : "center"}}>
            <Image source={{uri : props.profile }} style={{width : 80, height : 80, borderRadius : 40, backgroundColor : colors.card}}/>
            <Text style={[textStyle.body1, {color : colors.text, marginStart : 16}]}>{props.nickname}</Text>
        </View>
    )
}

export {ProfileView}