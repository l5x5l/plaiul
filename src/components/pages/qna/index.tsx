import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { commentSliceState } from "../../../redux/comment/commentSlice";
import { rootState } from "../../../redux/store";
import { qnaScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { MoreButton } from "../../atoms/moreButton";
import { CommentView } from "../../blocks/commentView";
import { QnaView } from "../../blocks/qnaView";

const QnaScreen = ({ route, navigation }: qnaScreenProps) => {

    const [bottomSheetShow, setBottomSheetShow] = useState(false)
    const commentListInfo = useSelector<rootState, commentSliceState>(state => state.commentList)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <BackButton margin={4} onPress={() => {
                        navigation.goBack()
                    }} />
                    <MoreButton margin={4} onPress={() => {
                        setBottomSheetShow(true)
                    }} />
                </View>
                <FlatList data={commentListInfo.data}
                    renderItem={({ item }) => <CommentView Comment={item} />}
                    ListHeaderComponent={
                        <QnaView qnaIdx={route.params.qnaIdx} />
                    } />
            </View>

        </SafeAreaView>
    )
}

export { QnaScreen }