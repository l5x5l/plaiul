import { useTheme } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import myPagePostSlice, { loadMyPostData, myPagePostSliceState } from "../../../redux/myPageLike.ts/myPageLikeSlice";
import { rootDispatch, rootState } from "../../../redux/store";
import textStyle from "../../../style/textStyle";
import { myPageLikeCategory } from "../../../type/data/mypageLikeCategory";
import { PostDto } from "../../../type/DTO/postDto";
import { TipDto } from "../../../type/DTO/tipDto";
import { mypagePostScreenProps } from "../../../type/navigate/types";
import { BackButton } from "../../atoms/backButton";
import { SelectButton } from "../../atoms/selectButton";
import PostView from "../../blocks/postView";
import TipView from "../../blocks/tipView";

const MyPagePostScreen = ({ route, navigation }: mypagePostScreenProps) => {

    const { colors } = useTheme()
    const mypagePostInfo = useSelector<rootState, myPagePostSliceState>(state => state.mypagePost)
    const dispatch = useDispatch<rootDispatch>()
    const action = myPagePostSlice.actions
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        dispatch(action.init({ category: route.params.category, detailCategory: route.params.detailCategory }))

        return () => {dispatch(action.clear())}
    }, [])

    useEffect(() => {
        dispatch(loadMyPostData({ category: route.params.category, detailCategory: mypagePostInfo.detailCategory, cursor: undefined }))
    }, [mypagePostInfo.detailCategory])

    const getCategoryText = (category: myPageLikeCategory) => {
        switch (category) {
            case "myTip":
                return "내가 쓴 tip"
            case "myPost":
                return "내가 쓴 게시글"
            case "likeTip":
                return "좋아요 한 tip"
            case "likePost":
                return "좋아요 한 게시글"
            case "commentPost":
                return "댓글 단 글"
        }
    }

    function setData() {
        if (!mypagePostInfo.isLast) {
            dispatch(loadMyPostData({ category: route.params.category, detailCategory: mypagePostInfo.detailCategory, cursor: undefined }))
        }
    }

    const refreshList = () => {
        dispatch(action.refresh())
        dispatch(loadMyPostData({ cursor: undefined,  category: route.params.category, detailCategory: route.params.detailCategory}))
        setIsRefresh(false)
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <BackButton margin={4} onPress={() => { navigation.goBack() }} />
                <Text style={[textStyle.headline1, { color: colors.text, marginTop: 24, marginStart : 16, marginBottom : 32 }]}>{getCategoryText(mypagePostInfo.category)}</Text>
                {
                    route.params.detailCategory &&
                        useMemo(() =>
                            <View style={{ flexDirection: "row", marginTop: 24, paddingHorizontal : 16 }}>
                                <SelectButton isSelected={mypagePostInfo.detailCategory === "story"} text={"story"} marginStart={0} onPress={() => {
                                    dispatch(action.changeDetailCategory("story"))
                                }} />
                                <SelectButton isSelected={mypagePostInfo.detailCategory === "qna"} text={"qna"} marginStart={8} onPress={() => {
                                    dispatch(action.changeDetailCategory("qna"))
                                }} />
                            </View>
                            , [mypagePostInfo.detailCategory])
                }
                {
                    mypagePostInfo.detailCategory ?
                        mypagePostInfo.detailCategory === "story" ?
                            <FlatList style={{paddingHorizontal : 16}} key={"mypage_story"} keyExtractor={item => (item.storyIdx === undefined) ? `mypage_qna_${item.qnaIdx}` : `mypage_story_${item.storyIdx}`} numColumns={2} data={mypagePostInfo.data as PostDto[]} renderItem={({ item }) => <PostView post={item} onClick={(idx: number) => {
                                navigation.push("Story", { storyIdx: idx })
                            }}/>}
                                onEndReachedThreshold={0.8}
                                onEndReached={() => { }} refreshing={isRefresh} onRefresh={() => { refreshList() }} />
                            :
                            <FlatList style={{paddingHorizontal : 16}} key={"mypage_qna"} keyExtractor={item => (item.storyIdx === undefined) ? `mypage_qna_${item.qnaIdx}` : `mypage_story_${item.storyIdx}`} numColumns={1} data={mypagePostInfo.data as PostDto[]} renderItem={({ item }) => <PostView post={item} onClick={(idx: number) => {
                                if (mypagePostInfo.detailCategory === "story")
                                    navigation.push("Story", { storyIdx: idx })
                                else
                                    navigation.push("Qna", { qnaIdx: idx })
                            }} />}
                                onEndReachedThreshold={0.8}
                                onEndReached={() => {  }} refreshing={isRefresh} onRefresh={() => { refreshList() }} />
                        :
                        <FlatList key={"mypage_tip"} keyExtractor={item => `tip_${item.tipIdx}`} numColumns={1} data={mypagePostInfo.data as TipDto[]} renderItem={({ item }) => <TipView tip={item} onClick={(idx: number) => {
                            navigation.push("Tip", {tipIdx : idx})
                        }} />}
                            onEndReachedThreshold={0.8}
                            onEndReached={() => { setData() }} refreshing={isRefresh} onRefresh={() => { refreshList() }} />

                }

            </View>
        </SafeAreaView>
    )
}

export { MyPagePostScreen }