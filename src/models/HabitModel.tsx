import { FieldValue } from "firebase/firestore"

//model used in UI
export interface HabitDisplay{
    id:string
    name:String
    habitType:String
    goal:Number
    streak:Number
    startDate:Date
    estimatedDate:Date
}

//model received in props
export interface HabitProp{
    id:string
    createTime:Date
    name:string
    goal:number
    habitType:string
    doneHistories:Date[]
    resetHistories:Date[]
}

//model sent to db
export interface HabitInput{
    createTime:FieldValue
    name:string
    goal:number
    habitType:string
    doneHistories:Date[]
    resetHistories:Date[]
}

// Model received from db
export interface HabitDB{
    id:string
    createTime:FieldValue
    name:string
    goal:number
    habitType:string
    doneHistories:Date[]
    resetHistories:FieldValue[]
}