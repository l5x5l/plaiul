import { AxiosError } from "axios"
import { apiBaseResponse } from "../api"
import { postRefreshToken } from "../api/login"
import { PlaiulNavigation } from "./navigation"
import { setAccessToken, setRefreshToken } from "./token"

const refreshTokenKey = "plaiul/refreshToken"
const accessTokenKey = "plaiul/accessToken"

async function callNeedLoginApi<T, G>(apiCall: () => Promise<apiBaseResponse<T, G>>) {
    try {
        let result = await apiCall()

        if (result.data !== undefined) {
            return result
        }
        if (result.code === 1102) {
            const refreshTokenResult = await postRefreshToken()
            if (refreshTokenResult.data !== undefined) {
                
                await setRefreshToken(refreshTokenResult.data!!.refreshToken)
                await setAccessToken(refreshTokenResult.data!!.accessToken)
                
                let result = await apiCall()
                if (result.data !== undefined) {
                    return result
                } else {
                    throw AxiosError
                }
            } else {
                throw AxiosError
            }
        }
        else if (result.code === 1101) {
            PlaiulNavigation.getInstance().callLoginScreen()
        } else if (result.code) { // 기타 서버 에러의 경우
            return result
        }
    } catch (error) {
        console.log(`Error : ${JSON.stringify(error)}`)
    }

}
export default callNeedLoginApi
export { refreshTokenKey, accessTokenKey }