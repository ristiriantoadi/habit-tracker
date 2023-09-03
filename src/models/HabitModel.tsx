import { FieldValue, Timestamp } from "firebase/firestore"

//model received in props
export interface HabitProp{
    id:string
    createTime:Date
    name:string
    goal:number
    habitType:string
    doneHistories:Date[]
    resetHistories:Date[]
    isDone:boolean
    streak:number
    estimatedDate:Date
}

//model sent to db
export interface HabitInput{
    createTime:FieldValue
    name:string
    goal:number
    habitType:string
    doneHistories:Date[]
    resetHistories:Date[]
    isDone?:boolean
}

// Model received from db
export interface HabitDB{
    id:string
    createTime:Timestamp
    name:string
    goal:number
    habitType:string
    doneHistories:Timestamp[]
    resetHistories:Timestamp[]
    isDone?:boolean
}