import { apiClient } from "@/api/apis.config";
import { 
    Credentials, 
    LoginAPIResponse 
} from "@/types";

export const loginApi = async(credentials: Credentials): Promise<LoginAPIResponse> => {
    return await apiClient.post('/user/login', credentials);
}