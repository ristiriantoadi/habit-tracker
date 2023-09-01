import { FieldValue } from "firebase/firestore"

export interface HabitInput{
    createTime:FieldValue
    name:string
    goal:number
    habitType:string
    doneHistories:Date[]
    resetHistories:Date[]
}

export interface HabitReceived{
    id:string
    createTime:FieldValue
    name:string
    goal:number
    habitType:string
    doneHistories:Date[]
    resetHistories:Date[]
}