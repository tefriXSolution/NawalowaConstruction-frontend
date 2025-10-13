import { loginApi } from "@/api";
import { LoginResponse } from "@/types";
import { validateToken } from "@/utils";

export const loginService = async(email: string, password: string):Promise<LoginResponse> => {
    const result = await loginApi({email, password});
    if(!result.error && result.user && result.token){
        const tokenResult = validateToken(result.token);
        if(tokenResult.error){
            return {message: 'Invalid token received', error: true};
        }
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        return {message: result.message, error: false};
    }
    return {message: result.message, error: true};
}
