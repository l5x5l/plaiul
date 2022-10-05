import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getHomeData } from "../../../../api/home";
import { changePostDtoList, PostDto } from "../../../../type/DTO/postDto";
import { TipDto } from "../../../../type/DTO/tipDto";
import { PostPagerView } from "../../../blocks/postPagerView";
import { TipPagerView } from "../../../blocks/tipPagerView";

const HomeScreen = () => {

    const [tips, setTips] = useState<TipDto[]>([])
    const [popularPosts, setPopularPosts] = useState<PostDto[]>([])
    const [recentlyPosts, setRecentlyPosts] = useState<PostDto[]>([])
    const [isLoaing, setIsLoading] = useState(false)

    const loadData = async () => {
        const response = await getHomeData()
        if (response.data) {
            setTips(response.data.tips)
            setPopularPosts(response.data.popularPosts)
            setRecentlyPosts(response.data.recentlyPosts)
        } else {
            // 에러처리
        }
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        loadData()
    }, [])

    return (
        <ScrollView style={HomeStyle.homeContainer}>
            <TipPagerView tipClick={function (itemIdx: number): void {
                
            } } screen={"home"} tipList={tips}></TipPagerView>
            <PostPagerView title={"인기 게시글"} posts={changePostDtoList(popularPosts)}/>
            <PostPagerView title={"최근 게시글"} posts={changePostDtoList(recentlyPosts)}/>
            <View style={{height : 56}}/>
        </ScrollView>
    )
}

const HomeStyle = StyleSheet.create({
    homeContainer : {
        flex : 1,
    },
    growersTipArea : {
        flexDirection : "row",
        height : 180,
        marginTop : 24
    }
})

export {HomeScreen}