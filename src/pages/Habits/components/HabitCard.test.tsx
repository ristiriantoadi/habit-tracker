import { getCurrentStreakPositiveHabit } from "./HabitCardV2"

const generateConsecutiveDatesReversed = (startDate:Date,n:number)=>{
    let consecutiveDates:Date[]=[]
    // console.log("startdate",startDate)
    for (let i = 0;i<n;i++){
        let currentDate=new Date(startDate)
        currentDate.setDate(startDate.getDate() - i)
        consecutiveDates.push(currentDate)
    }
    return consecutiveDates.slice().reverse()
}

describe("HabitCard",()=>{
    describe("getCurrentStreakPositiveHabit",()=>{
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
        }),
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
            console.log("dates",dates)
            const result = getCurrentStreakPositiveHabit(dates,startDateOne)
            expect(result).toEqual(n)
            
        })
        // test("2 consecutive days ")
    })
})

export { }
