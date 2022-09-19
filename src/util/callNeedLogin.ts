import { AxiosError } from "axios"
import { apiBaseResponse } from "../api"
import { postRefreshToken } from "../api/login"
import { setAccessToken, setRefreshToken } from "./token"

const refreshTokenKey = "plaiul/refreshToken"
const accessTokenKey = "plaiul/accessToken"

async function callNeedLoginApi<T>(apiCall: () => Promise<apiBaseResponse<T, any>>, repeat : boolean = false) {
    try {
        let result = await apiCall()
        if (result.data !== undefined) {
            return result
        }
        if (result.code === 1102) {
            const refreshTokenResult = await postRefreshToken()
            if (refreshTokenResult.data !== undefined){
                // access 토큰을 재발급받아 다시 api를 호출한 경우에도 정상적인 접근이 되지 않은 경우 무한반복 예방을 위해 error throw
                if (repeat) {
                    throw Error("need login api call twice! need fix")
                }
                await setRefreshToken(refreshTokenResult.data.refreshToken)
                await setAccessToken(refreshTokenResult.data.accessToken)
                // 무한 반복 가능성?
                await callNeedLoginApi<T>(apiCall, true)
            } else {
                throw AxiosError
            }
        }
        else if (result.code === 1101) {
            //navigation.navigation.push("LoginHome")
            console.log("호출!")
        }
    } catch (error) {
        if (repeat) throw error

        else console.log(`Error : ${JSON.stringify(error)}`)
    }

}
export default callNeedLoginApi
export {refreshTokenKey, accessTokenKey}