import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import qnaSlice, { loadQna, qnaSliceState } from "../../../redux/qna/qnaSlice";
import { rootDispatch, rootState } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { Line } from "../../atoms/line";

export declare type QnaViewProps = {
    qnaIdx : number
}

const QnaView = (props : QnaViewProps) => {
    const { colors } = useTheme()

    const dispatch = useDispatch<rootDispatch>()
    const qna = useSelector<rootState, qnaSliceState>(state => state.qna)
    const action = qnaSlice.actions

    useEffect(() => {
        dispatch(loadQna(props.qnaIdx))

        return () => {
            dispatch(action.claer())
        }
    }, [])

    return (
        <View style={{ paddingHorizontal: 16 }}>
            <Text style={[textStyle.headline1, { color: colors.text, marginTop: 40 }]}>{qna.value.title}</Text>
            <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}>
                <Image style={{ height: 40, width: 40, borderRadius: 20, backgroundColor : colors.card }} source={{ uri: qna.value.user.profile }} />
                <Text style={[textStyle.body2, {color : colors.text, marginStart : 8}]}>{qna.value.user.nickname}</Text>
                <Text style={[textStyle.body2, {color : colors.text, marginStart : 8}]}>{qna.value.createdAt}</Text>
            </View>
            <Text style={[textStyle.body2, {width : "100%", marginTop : 20, color : colors.text}]}>{qna.value.content}</Text>
            <View style={{flexDirection :"row", marginTop : 20}}>
                <Image style={{height : 28, width : 28, tintColor : colors.border}} source={require("../../../assets/images/comment_28.png")}/>
                <Text style={[textStyle.body2, {color : colors.text, marginStart : 4}]}>{qna.value.commentCnt}</Text>
                <Image style={{height : 28, width : 28, tintColor : colors.border, marginStart : 24}} source={qna.value.isLiked ? require("../../../assets/images/heart_fill_28.png") : require("../../../assets/images/heart_stroke_28.png")}/>
                <Text style={[textStyle.body2, {color : colors.text, marginStart : 4}]}>{qna.value.likeCnt}</Text>
            </View>
            <Line marginTop={16}/>
        </View>
    )
}

export { QnaView }