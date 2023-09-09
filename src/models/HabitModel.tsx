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
    userId?:string
    reminder?:Reminder
}


// Model received from db
export interface Reminder{
    secondSinceMidnight:number
    send:boolean
    timezone:string
}

export interface HabitDB{
    id:string
    createTime:Timestamp
    name:string
    goal:number
    habitType:string
    doneHistories:Timestamp[]
    resetHistories:Timestamp[]
    isDone?:boolean
    reminder?:Reminder
}

//model used in chart
export interface HabitChart{
    currentDate:Date
    count:number
}