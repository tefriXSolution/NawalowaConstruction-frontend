import { loginApi, logOutApi } from "@/api";
import { LoginResponse, LogOutResponse } from "@/types";
import { validateToken } from "@/utils";

export const loginService = async(email: string, password: string):Promise<LoginResponse> => {
    const result = await loginApi({email, password});
    if(!result.error && result.user && result.token && result.refreshToken){
        const tokenResult = validateToken(result.token);
        if(tokenResult.error){
            return {message: 'Invalid token received', error: true};
        }
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('user', JSON.stringify(result.user));
        return {message: result.message, error: false};
    }
    return {message: result.message, error: true};
}
export const logOutService = async(email: string):Promise<LogOutResponse> => {
    const result = await logOutApi(email);
    if(result.error){
        return {message: result.message, error: true};
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    return {message: result.message, error: false};
}
