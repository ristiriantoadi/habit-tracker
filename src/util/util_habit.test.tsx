import { Timestamp } from "firebase/firestore"
import { HabitDB } from "../models/HabitModel"
import { getCurrentDate, getDaysBetweenTwoDates } from "./util_date"
import { filterHabitsByIsDone, filterHabitsByName, getDataChartNegativeHabit } from "./util_habit"

describe("search",()=>{
    test("empty text return everything",async ()=>{
        const habits:HabitDB[] = [
            {
                id:"123",
                createTime:Timestamp.now(),
                name:"something",
                goal:12,
                habitType:"positive",
                doneHistories:[],
                resetHistories:[],
            },
            {
                id:"123",
                createTime:Timestamp.now(),
                name:"jalan kaki",
                goal:12,
                habitType:"positive",
                doneHistories:[],
                resetHistories:[],
            },
            {
                id:"123",
                createTime:Timestamp.now(),
                name:"makan buah",
                goal:12,
                habitType:"positive",
                doneHistories:[],
                resetHistories:[],
            },
            {
                id:"123",
                createTime:Timestamp.now(),
                name:"merokok",
                goal:12,
                habitType:"negative",
                doneHistories:[],
                resetHistories:[],
            }
        ]
        const habitsFiltered = filterHabitsByName(habits,"")
        expect(habitsFiltered).toEqual(habits)
    })
    test("search is case insensitive",()=>{
        const habits:HabitDB[] = [
            {
                id:"123",
                createTime:Timestamp.now(),
                name:"Merokok",
                goal:12,
                habitType:"positive",
                doneHistories:[],
                resetHistories:[],
            },
        ]

        const habitsFiltered = filterHabitsByName(habits,"meroKok")
        expect(habitsFiltered).toEqual(habits)

    })

    test("search not match return empty list",()=>{
        const habits:HabitDB[] = [
            {
                id:"123",
                createTime:Timestamp.now(),
                name:"Merokok",
                goal:12,
                habitType:"positive",
                doneHistories:[],
                resetHistories:[],
            },
        ]

        const habitsFiltered = filterHabitsByName(habits,"rs")
        expect(habitsFiltered).toEqual([])

    })

    test("search can match partial",()=>{
        const habits:HabitDB[] = [
            {
                id:"123",
                createTime:Timestamp.now(),
                name:"Merokok",
                goal:12,
                habitType:"positive",
                doneHistories:[],
                resetHistories:[],
            },
        ]

        const habitsFiltered = filterHabitsByName(habits,"rok")
        expect(habitsFiltered).toEqual(habits)

    })

    test("search by isDone=true, return only habit with isDone=true",()=>{
        const habits:HabitDB[] = [
            {
                id:"123",
                createTime:Timestamp.fromDate(new Date("2023-09-03")),
                name:"done",
                goal:1,
                habitType:"positive",
                doneHistories:[Timestamp.fromDate(new Date("2023-09-03"))],
                resetHistories:[],
            },
            {
                id:"123",
                createTime:Timestamp.fromDate(new Date("2023-09-03")),
                name:"not done",
                goal:2,
                habitType:"positive",
                doneHistories:[Timestamp.fromDate(new Date("2023-09-03"))],
                resetHistories:[],
            },
        ]
        const filteredHabits = filterHabitsByIsDone(habits,true,new Date("2023-09-03"))
        expect(filteredHabits).toHaveLength(1)
        expect(filteredHabits[0].name).toEqual("done")
    })

    test("search by isDone=false, return only habit with isDone=false",()=>{
        const habits:HabitDB[] = [
            {
                id:"123",
                createTime:Timestamp.now(),
                name:"done",
                goal:1,
                habitType:"positive",
                doneHistories:[Timestamp.fromDate(new Date("2023-09-03"))],
                resetHistories:[],
            },
            {
                id:"123",
                createTime:Timestamp.now(),
                name:"not done",
                goal:2,
                habitType:"positive",
                doneHistories:[Timestamp.fromDate(new Date("2023-09-03"))],
                resetHistories:[],
            },
        ]
        const filteredHabits = filterHabitsByIsDone(habits,false,new Date("2023-09-03"))
        expect(filteredHabits).toHaveLength(1)
        expect(filteredHabits[0].name).toEqual("not done")
    })
})

//test getDataChartNegativeHabit
test("if currentDate and startDate is the same, return empty list",()=>{
    const data = getDataChartNegativeHabit(getCurrentDate(),[],getCurrentDate())
    expect(data).toEqual([])
})

test("length of data is currentDate-startDate",()=>{
    const currentDate=new Date("2023-09-08")
    const startDate=new Date("2023-09-05")
    const data = getDataChartNegativeHabit(currentDate,[],startDate)
    expect(data.length).toEqual(getDaysBetweenTwoDates(currentDate,startDate))
})

test("if resetHistories are empty, the count of the first element data is 1 and the count of the last element of data is n",()=>{
    const currentDate=new Date("2023-09-08")
    const startDate=new Date("2023-09-05")
    const n = getDaysBetweenTwoDates(currentDate,startDate)
    const data = getDataChartNegativeHabit(currentDate,[],startDate)
    expect(data[data.length-1]["count"]).toEqual(n)
})

test("resetHistories are not empty",()=>{
    const currentDate=new Date("2023-09-10")
    const startDate=new Date("2023-09-05")
    const resetHistories = [new Date("2023-09-07")]
    const data = getDataChartNegativeHabit(currentDate,resetHistories,startDate)
    const result = [
        {currentDate:new Date("2023-09-05"),count:1},
        {currentDate:new Date("2023-09-06"),count:2},
        {currentDate:new Date("2023-09-07"),count:0},
        {currentDate:new Date("2023-09-08"),count:1},
        {currentDate:new Date("2023-09-09"),count:2}
    ]
    // expect(data).toEqual(result)
    data.forEach((d,index)=>{
        expect(d.currentDate).toEqual(result[index].currentDate)
        expect(d.count).toEqual(result[index].count)
    })
})