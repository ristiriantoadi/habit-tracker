import { Timestamp } from "firebase/firestore"
import { HabitDB } from "../models/HabitModel"
import { filterHabitsByIsDone, filterHabitsByName } from "./util_habit"

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