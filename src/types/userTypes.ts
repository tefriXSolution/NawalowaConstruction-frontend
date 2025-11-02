export interface Credentials{
    email: string;
    password: string;
}

export enum Role {
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
}

export interface User{
    id?: string;
    fname: string;
    lname: string;
    email: string;
    phone?: string;
    role: Role;
}

export interface NewUser {
    fname: string, 
    lname: string, 
    email:string, 
    role:Role,
    phone?: string;
    password:string
}

export interface LoginAPIResponse {
    message:string;
    error:boolean;
    user:User | null;
    token:string | null;
    refreshToken:string | null;
}
export interface LoginResponse {
    message:string;
    error:boolean;
    data:LoginAPIResponse | null;
}

export interface LogOutResponse {
  message: string;
  error: boolean;
}