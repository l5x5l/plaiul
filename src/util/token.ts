import AsyncStorage from "@react-native-async-storage/async-storage"
import { accessTokenKey, refreshTokenKey } from "./callNeedLogin"

const getRefreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem(refreshTokenKey)
    return refreshToken != null ? JSON.parse(refreshToken) : null;
}

const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem(accessTokenKey)
    return accessToken != null ? JSON.parse(accessToken) : null;
}

const setRefreshToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(refreshTokenKey, token)
        return true
    } catch (error) {
        return false
    }
}

const setAccessToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(accessTokenKey, token)
        return true
    } catch (error) {
        return false
    }
}

const removeRefreshToken = async() => {
    await AsyncStorage.removeItem(refreshTokenKey)
}

const removeAccessToken = async() => {
    await AsyncStorage.removeItem(accessTokenKey)
}


export { getRefreshToken, getAccessToken, setRefreshToken, setAccessToken, removeRefreshToken, removeAccessToken }