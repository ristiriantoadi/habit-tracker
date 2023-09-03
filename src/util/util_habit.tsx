import { Timestamp } from "firebase/firestore"
import { HabitDB } from "../models/HabitModel"
import { addDate, areDatesConsecutive, convertDateObjectToYearMonthDate, getCurrentDate, getDaysBetweenTwoDates } from "./util_date"

export const getCurrentStreakNegativeHabit = (resetHistories:Date[],startDate:Date,currentDate:Date)=>{
    if (resetHistories.length == 0) return Math.abs(getDaysBetweenTwoDates(startDate,currentDate))

    const lastReset = resetHistories[resetHistories.length-1]
    return Math.abs(getDaysBetweenTwoDates(lastReset,currentDate))
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

export const getCurrentStreak = (data:HabitDB)=>{
    const currentDate = getCurrentDate()
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

export const filterHabits = (habits:HabitDB[],text:string)=>{
    const regex = new RegExp(text, "i")
    const habitsFiltered = habits.filter((habit) => regex.test(habit.name));
    return habitsFiltered
  
  }