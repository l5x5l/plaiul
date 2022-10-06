// 화면이동의 용이성을 위해 splash/index.js 에서 초기화하는 화면 이동 싱글톤 객체입니다.
class PlaiulNavigation {
    private static instance : PlaiulNavigation

    // 로그인 화면을 호출하는 함수입니다.
    private goToLogin : () => void = () => {}

    private constructor(goToLoginParam : () => void) {
        this.goToLogin = goToLoginParam
    }

    // 로그인 화면을 호출합니다.
    public callLoginScreen() {
        this.goToLogin()
    }

    public static init(goToLogin : () => void) {
        this.instance = new PlaiulNavigation(goToLogin)
    }

    // 본 함수를 호출하기 전 반드시 splash/index.js에서 init을 호출해야 합니다.
    public static getInstance() {
        return this.instance || (this.instance = new PlaiulNavigation(()=>{}))
    }
}
export {PlaiulNavigation}