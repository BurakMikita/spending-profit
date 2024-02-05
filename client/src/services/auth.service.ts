import { instance } from "../api/axios.api";
import { IReponseUserData, IUSer, IUserData } from "../types/types";

export const  AuthService = {
    async registratiom(userData: IUserData): Promise<IReponseUserData | undefined> {
       const {data } =  await instance.post<IUserData, {data: IReponseUserData}>("user", userData)
       return data
    },
    async login(userData: IUserData): Promise<IUSer | undefined> {
        const {data } =  await instance.post<IUSer>("auth/login", userData)
        return data
    },
    async getProfile(){
        const {data } =  await instance.get<IUSer>("auth/profile")
        return data
    }
}