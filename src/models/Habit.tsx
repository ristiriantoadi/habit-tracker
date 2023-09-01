import { FieldValue } from "firebase/firestore"

export interface Habit{
    createTime:FieldValue
    name:string
    goal:number
    habitType:string
    doneHistories:Date[]
    resetHistories:Date[]
}