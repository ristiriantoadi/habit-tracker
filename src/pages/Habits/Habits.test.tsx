// import { act } from "react-dom/test-utils"

import { Timestamp } from "firebase/firestore"
import { HabitDB } from "../../models/HabitModel"
import { filterHabits } from "../../util/util_habit"

jest.mock("firebase/firestore",() => {
    return {
        ...jest.requireActual('firebase/firestore'),
        getDocs:jest.fn(),
        collection:jest.fn(),
        updateDoc:jest.fn(),
        doc:jest.fn()
        // path:{indexOf:jest.fn()}
      
    }
})

test("on click reset button, streak goes back to 0",async ()=>{
    // (updateDoc as jest.Mock).mockResolvedValue({});
    // (getDocs as jest.Mock).mockResolvedValue({"docs":[
    //     {"id":1,data:()=>({"name":"Merokok","createTime":Timestamp.fromDate(new Date("2023-08-28")),"goal":10,"habitType":"negative","doneHistories":[],"resetHistories":[]})}]})

    // act(()=>{
    //     render(
    //         <BrowserRouter>
    //             <Habits></Habits>
    //         </BrowserRouter>
    //     )
    // })
    
    // const buttons = await screen.findAllByTestId("button-reset")
    // userEvent.click(buttons[1])
    
    // const streak = await screen.findByTestId("streak")
    // expect(streak.innerHTML).toEqual("0")
})

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
        const habitsFiltered = filterHabits(habits,"")
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

        const habitsFiltered = filterHabits(habits,"meroKok")
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

        const habitsFiltered = filterHabits(habits,"rs")
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

        const habitsFiltered = filterHabits(habits,"rok")
        expect(habitsFiltered).toEqual(habits)

    })
})

export { }
