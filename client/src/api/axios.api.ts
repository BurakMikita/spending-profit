import axios from "axios";
import { getTokenFromLocalStorege } from "../healpers/localstorage.helper";

export const instance  = axios.create(
    {
        baseURL: "http://localhost:3000/api",
        headers: {
            Authorization: "Bearer " + getTokenFromLocalStorege() || "",
        }
    }
)