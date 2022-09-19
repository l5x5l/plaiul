import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import commentSlice, { commentSliceState, loadCommentList } from "../../../redux/comment/commentSlice";
import { rootDispatch, rootState, store } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { storyCommentScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { Line } from "../../atoms/line";
import { CommentView } from "../../blocks/commentView";

const StoryCommentScreen = ({ route, navigation }: storyCommentScreenProps) => {
    const { colors, dark } = useTheme()

    const dispatch = useDispatch<rootDispatch>()
    const commentListInfo = useSelector<rootState, commentSliceState>(state => state.commentList)
    const action = commentSlice.actions

    function setData() {
        if (!commentListInfo.isLast) {
            dispatch(loadCommentList({postIdx : route.params.storyIdx ,cursor : commentListInfo.cursor}))
        }
    }

    useEffect(() => {
        console.log(route.params.storyIdx)
        store.dispatch(action.setPostType("story"))
        store.dispatch(action.setBasePost(route.params.storyIdx))
        setData()

        return () => {
            store.dispatch(action.clear())
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <BackButton margin={4} onPress={() => {
                    store.dispatch(action.clear())
                    navigation.goBack()
                }} />
                <FlatList keyExtractor={item => `${commentListInfo.postIdx}_comment${item.commentIdx}`} style={{ flex: 1 }} data={commentListInfo.data} renderItem={({ item }) => <CommentView Comment={item} />}
                    onEndReachedThreshold={0.8} onEndReached={() => { setData() }} />
                <View>
                    <Line />
                    <View style={{ flexDirection: "row", padding: 8,  borderColor : colors.border, borderWidth : 1}}>
                        <TextInput  style={{flex : 1, backgroundColor : dark ? "#F3F0EB" : "#E8EDEB"}}/>
                        <Pressable>
                            <Text style={[{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.border, color: colors.background }, textStyle.body2]}>등록</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export {StoryCommentScreen}