import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { HabitProp } from "../../../models/HabitModel"
import { addDate } from "../../../util/util_date"
import { getCurrentStreakNegativeHabit, getCurrentStreakPositiveHabit } from "../../../util/util_habit"
import HabitCard from "./HabitCard"

const generateConsecutiveDatesReversed = (startDate:Date,n:number)=>{
    let consecutiveDates:Date[]=[]
    for (let i = 0;i<n;i++){
        let currentDate=new Date(startDate)
        currentDate.setDate(startDate.getDate() - i)
        consecutiveDates.push(currentDate)
    }
    return consecutiveDates.slice().reverse()
}

// test getCurrentStreakPositiveHabit
test("if doneHistories are empty return 0",()=>{
    const result = getCurrentStreakPositiveHabit([],new Date("2023-09-02"))
    expect(result).toEqual(0)
})
test("2 consecutive dates starting from currentDate should return 2",()=>{
    const result = getCurrentStreakPositiveHabit([new Date("2023-09-01"),new Date("2023-09-02")],new Date("2023-09-02"))
    expect(result).toEqual(2)
})
test("3 consecutive days more than 1 day ago from currentDate should return 0",()=>{
    const result = getCurrentStreakPositiveHabit([new Date("2023-08-29"),new Date("2023-08-30"),new Date("2023-08-31")],new Date("2023-09-02"))
    expect(result).toEqual(0)
})

test("n consecutive days starting from 1 day ago should return n",()=>{
    const currentDate = new Date("2023-09-02")
    const startDate = new Date("2023-09-01")
    const n = 50
    const consecutiveDates = generateConsecutiveDatesReversed(startDate,n)
    const result = getCurrentStreakPositiveHabit(consecutiveDates,currentDate)
    expect(result).toEqual(n)
})

test("n consecutive days starting from current date should return n",()=>{
    const currentDate = new Date("2023-09-02")
    const startDate = new Date("2023-09-02")
    const n = 5
    const consecutiveDates = generateConsecutiveDatesReversed(startDate,n)
    const result = getCurrentStreakPositiveHabit(consecutiveDates,currentDate)
    expect(result).toEqual(n)
})

test("n consecutive days starting from 2 days ago should return 0",()=>{
    const currentDate = new Date("2023-09-02")
    const startDate = new Date("2023-08-31")
    const n = 5
    const consecutiveDates = generateConsecutiveDatesReversed(startDate,n)
    const result = getCurrentStreakPositiveHabit(consecutiveDates,currentDate)
    expect(result).toEqual(0)
})

test("n consecutive days and then a gap of one day and m consecutive days should return n",()=>{
    const startDateOne= new Date("2023-09-02")
    const n = 3
    const consecutiveDatesOne = generateConsecutiveDatesReversed(startDateOne,n)

    const gap = 1
    const startDateTwo = new Date(consecutiveDatesOne[0].getTime()-(24 * 60 * 60 * 1000)*(gap+1))
    const m = 3
    const consecutiveDatesTwo = generateConsecutiveDatesReversed(startDateTwo,m)
    const dates = [...consecutiveDatesTwo,...consecutiveDatesOne]

    const result = getCurrentStreakPositiveHabit(dates,startDateOne)
    expect(result).toEqual(n)
})

test("n consecutive days and then a gap of more than 1 day and m consecutive days should return n",()=>{
    const startDateOne= new Date("2023-09-02")
    const n = 3
    const consecutiveDatesOne = generateConsecutiveDatesReversed(startDateOne,n)

    const gap=2
    const startDateTwo = new Date(consecutiveDatesOne[0].getTime()-(24 * 60 * 60 * 1000)*(gap+1))
    const m = 3
    const consecutiveDatesTwo = generateConsecutiveDatesReversed(startDateTwo,m)

    const dates = [...consecutiveDatesTwo,...consecutiveDatesOne]
    const result = getCurrentStreakPositiveHabit(dates,startDateOne)
    expect(result).toEqual(n)    
})

// test getCurrentStreakNegativeHabit
test("if resetHistories are empty, return the difference between startDate and currentDate-1 (inclusive)",()=>{
    const startDate = new Date("2023-08-24")
    const currentDate = new Date("2023-08-27")
    const res = getCurrentStreakNegativeHabit([],startDate,currentDate)
    expect(res).toEqual(3)
})
test("if resetHistories are empty, and startDate is the previous day",()=>{
    const startDate = new Date("2023-08-24")
    const currentDate = new Date("2023-08-25")
    const res = getCurrentStreakNegativeHabit([],startDate,currentDate)
    expect(res).toEqual(1)
})

test("if resetHistories are empty, and startDate is today",()=>{
    const startDate = new Date("2023-08-24")
    const currentDate = new Date("2023-08-24")
    const res = getCurrentStreakNegativeHabit([],startDate,currentDate)
    expect(res).toEqual(0)
})

test("if resetHistories are not empty, and last reset value is today",()=>{
    const resetHistories = [new Date("2023-08-01"),new Date("2023-08-10"),new Date("2023-08-20")]
    const currentDate = new Date("2023-08-20")
    const startDate = new Date("2023-07-23")
    const res = getCurrentStreakNegativeHabit(resetHistories,startDate,currentDate)
    expect(res).toEqual(0)
})

test("if resetHistories are not empty, and last reset value is yesterday",()=>{
    const resetHistories = [new Date("2023-08-01"),new Date("2023-08-10"),new Date("2023-08-20")]
    const currentDate = new Date("2023-08-21")
    const startDate = new Date("2023-07-23")
    const res = getCurrentStreakNegativeHabit(resetHistories,startDate,currentDate)
    expect(res).toEqual(1)
})

test("if resetHistories are not empty, and last reset value is n days ago, return n",()=>{
    const resetHistories = [new Date("2023-08-01"),new Date("2023-08-10"),new Date("2023-08-20")]
    const n = 2
    const currentDate = addDate(resetHistories[resetHistories.length-1],n)
    const startDate = new Date("2023-07-23")
    const res = getCurrentStreakNegativeHabit(resetHistories,startDate,currentDate)
    expect(res).toEqual(n)
})

//test negative habit card
test("if streak == goal, reset button is gone, replaced with check icon",()=>{
    const habitProp:HabitProp = {
        id:"weopoew",
        createTime:new Date("2023-08-29"),
        name:"Test Negative",
        goal:4,
        habitType:"negative",
        doneHistories:[],
        resetHistories:[],
        streak:4,
        estimatedDate:new Date("2023-09-04"),
        isDone:true
    }
    render(<BrowserRouter><HabitCard key={"1"} doHabit={jest.fn()} resetStreak={jest.fn()} index={1} currentDate={new Date("2023-09-02")} habitProp={habitProp}/></BrowserRouter>)
    expect(screen.getByTestId("streak").innerHTML).toEqual("4")
    expect(screen.queryAllByTestId("button-reset").length).toEqual(0)
    screen.getAllByTestId("check-icon")
    
})

//test positive habit card
test("if streak == goal, check button is gone, replaced with check icon",()=>{
    const habitProp:HabitProp = {
        id:"weopoew",
        createTime:new Date("2023-08-29"),
        name:"Test Positive",
        goal:1,
        habitType:"positive",
        doneHistories:[new Date("2023-09-01")],
        resetHistories:[],
        streak:1,
        estimatedDate:new Date("2023-09-02"),
        isDone:true
    }
    render(<BrowserRouter><HabitCard key="1" doHabit={jest.fn()} resetStreak={jest.fn()} index={1} currentDate={new Date("2023-09-02")} habitProp={habitProp}/></BrowserRouter>)
    const streak = screen.getByTestId("streak")
    expect(streak.innerHTML).toEqual("1")
    const checkBox = screen.queryAllByTestId("checkbox")
    // expect(resetButton).not.toBeInTheDocument()
    expect(checkBox.length).toEqual(0)
    screen.getAllByTestId("check-icon")
    
})

test("if today already done, checkbox is checked and cannot be unchecked",()=>{
    const habitProp:HabitProp = {
        id:"123",
        createTime:new Date("2023-09-02"),
        name:"something",
        goal:12,
        habitType:"positive",
        doneHistories:[new Date("2023-09-02")],
        resetHistories:[],
        streak:5,
        estimatedDate:new Date("2023-09-05"),
        isDone:false}
    const currentDate = new Date("2023-09-02")
    render(<BrowserRouter><HabitCard habitProp={habitProp} doHabit={jest.fn()} index={1} resetStreak={jest.fn()} currentDate={currentDate} key={"1"}/></BrowserRouter>
    )
    const checkBoxes = screen.getAllByRole("checkbox")
    expect(checkBoxes[0]).toBeChecked()
    expect(checkBoxes[0]).toBeDisabled()
})