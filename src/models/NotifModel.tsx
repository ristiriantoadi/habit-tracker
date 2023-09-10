import { Timestamp } from "firebase/firestore";

export interface NotificationModel{
    createTime:Timestamp
    habitName:string
}