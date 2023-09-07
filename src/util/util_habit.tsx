import { Timestamp } from "firebase/firestore"
import { HabitChart, HabitDB } from "../models/HabitModel"
import { addDate, areDatesConsecutive, convertDateObjectToYearMonthDate, getCurrentDate, getDaysBetweenTwoDates } from "./util_date"

export const getCurrentStreakNegativeHabit = (resetHistories:Date[],startDate:Date,currentDate:Date)=>{
    if (resetHistories.length == 0) return Math.abs(getDaysBetweenTwoDates(startDate,currentDate))

    const lastReset = resetHistories[resetHistories.length-1]
    if (getDaysBetweenTwoDates(lastReset,currentDate) == 0) return 0
    return Math.abs(getDaysBetweenTwoDates(lastReset,currentDate)-1)
}

export const getCurrentStreakPositiveHabit = (doneHistories:Date[],currentDate:Date)=>{
    doneHistories = doneHistories;
    let currentStreak=0
    for (let i = doneHistories.length-1; i>=0; i--) {
        if (i === doneHistories.length-1){
            if (Math.abs(getDaysBetweenTwoDates(doneHistories[i],currentDate))>1) break
            currentStreak++
        }
        else if(areDatesConsecutive(doneHistories[i],doneHistories[i+1])){
            currentStreak++
        }else{
            break;
        }
      } 
    return currentStreak

}

export const getCurrentStreak = (data:HabitDB,currentDate?:Date)=>{
    if (currentDate == undefined) currentDate=getCurrentDate()
    let streak=0
    if (data.habitType == "positive"){
        const doneHistories = data.doneHistories.map((h:Timestamp)=>new Date(convertDateObjectToYearMonthDate(h.toDate())))
        streak = getCurrentStreakPositiveHabit(doneHistories,currentDate) 
        if (data.isDone === true){
            streak=data.goal
        }
    }else{
        const resetHistories = data.resetHistories.map((h:Timestamp)=>new Date(convertDateObjectToYearMonthDate(h.toDate())))
        const startDate = new Date(convertDateObjectToYearMonthDate(data.createTime.toDate()))
        streak = getCurrentStreakNegativeHabit(resetHistories,startDate,currentDate)
    }
    return streak
}

export const getEstimatedDate = (habit:HabitDB,currentStreak:number)=>{
    return addDate(getCurrentDate(),(habit.goal-currentStreak))
}

export const isHabitDone = (habit:HabitDB,currentStreak:number)=>{
    if (habit.goal == currentStreak) return true
    if (habit.habitType == "positive" && habit.isDone) return habit.isDone
    return false
}

export const filterHabitsByName = (habits:HabitDB[],text:string)=>{
    const regex = new RegExp(text, "i")
    return habits.filter((habit) => regex.test(habit.name))
  
}

export const filterHabitsByIsDone = (habits:HabitDB[],isDone:boolean,currentDate?:Date)=>{
    return habits.filter((habit)=>isDone == isHabitDone(habit,getCurrentStreak(habit,currentDate)))
}

export const getDataChartNegativeHabit = (currentDate:Date,resetHistories:Date[],startDate:Date)=>{
    let count=0
    let data:HabitChart[]=[]
    if (resetHistories.length>0)
        if (getDaysBetweenTwoDates(resetHistories[resetHistories.length-1],currentDate)==0){
            currentDate = addDate(currentDate,1)
        }
    while(startDate<currentDate){
        count+=1
        if (resetHistories.filter(h=>getDaysBetweenTwoDates(h,startDate)==0).length > 0){
            count=0
        }
        data.push({
            currentDate:startDate,
            count:count
        })
        startDate=addDate(startDate,1)

    }
    return data
}

export const getDataChartPositiveHabit = (currentDate:Date,doneHistories:Date[],startDate:Date)=>{
    let data:HabitChart[]=[]
    if (doneHistories.length>0)
        if (getDaysBetweenTwoDates(doneHistories[doneHistories.length-1],currentDate)==0){
            currentDate = addDate(currentDate,1)
        }
    while(startDate<currentDate){
        let count=0
        if (doneHistories.filter(h=>getDaysBetweenTwoDates(h,startDate)==0).length > 0){
            count=1
            if (data.length>0){
                count=data[data.length-1].count+1
            }
            
        }
        data.push({
            currentDate:startDate,
            count:count
        })
        startDate = addDate(startDate,1)
    }
    return data
}