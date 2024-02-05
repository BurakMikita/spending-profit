import { ObjectId } from "mongoose";

export interface IUser {
    _id: ObjectId,
    email: string
}