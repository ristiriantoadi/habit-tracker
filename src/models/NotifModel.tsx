import { Timestamp } from "firebase/firestore";

export interface NotificationModel{
    id:string
    createTime:Timestamp
    habitName:string
}