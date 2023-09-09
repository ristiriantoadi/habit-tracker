import { act, render, screen } from "@testing-library/react"
import { getDoc, serverTimestamp } from "firebase/firestore"
import { BrowserRouter } from "react-router-dom"
import Edit from "./Edit"

jest.mock("firebase/firestore",() => {
    return {
        ...jest.requireActual('firebase/firestore'),
        getDoc:jest.fn(),    
    }
})

test("if habit is positive, show reminder input",async ()=>{
    (getDoc as jest.Mock).mockResolvedValue({data:()=>({
        id:"123",
        createTime:serverTimestamp(),
        name:"123",
        goal:10,
        habitType:"positive",
        doneHistories:[],
        resetHistories:[]
    }),exists:()=>true})
    
    await act(()=>{
        render(<BrowserRouter><Edit/></BrowserRouter>)
    })
    screen.getByTestId("reminder-input")

})

test("if habit is negative, dont show reminder input",async ()=>{
    (getDoc as jest.Mock).mockResolvedValue({data:()=>({
        id:"123",
        createTime:{toDate:()=>new Date("2023-09-09")},
        name:"123",
        goal:10,
        habitType:"negative",
        doneHistories:[],
        resetHistories:[]
    }),exists:()=>true,
})
    
    await act(()=>{
        render(<BrowserRouter><Edit/></BrowserRouter>)
    })
    const input = screen.queryByTestId("reminder-input")
    expect(input).toBe(null)
})

test("if reminder.send = true, check the checkbox",async()=>{
    (getDoc as jest.Mock).mockResolvedValue({data:()=>({
            id:"123",
            createTime:{toDate:()=>new Date("2023-09-09")},
            name:"123",
            goal:10,
            habitType:"positive",
            doneHistories:[],
            resetHistories:[],
            reminder:{
                secondSinceMidnight:100,
                send:true
            }
        }),exists:()=>true,
    })
    
    await act(()=>{
        render(<BrowserRouter><Edit/></BrowserRouter>)
    })
    const element = screen.getByRole("checkbox")
    expect(element).toBeChecked()    


})

test("if reminder.send is false, checkbox is unchecked",async()=>{
    (getDoc as jest.Mock).mockResolvedValue({data:()=>({
            id:"123",
            createTime:{toDate:()=>new Date("2023-09-09")},
            name:"123",
            goal:10,
            habitType:"positive",
            doneHistories:[],
            resetHistories:[],
            reminder:{
                secondSinceMidnight:100,
                send:false
            }
        }),exists:()=>true,
    })
    await act(()=>{
        render(<BrowserRouter><Edit/></BrowserRouter>)
    })
    const element = screen.getByRole("checkbox")
    expect(element).not.toBeChecked()
})

test("if reminder is null, checkbox is unchecked",async()=>{
    (getDoc as jest.Mock).mockResolvedValue({data:()=>({
            id:"123",
            createTime:{toDate:()=>new Date("2023-09-09")},
            name:"123",
            goal:10,
            habitType:"positive",
            doneHistories:[],
            resetHistories:[],
        }),exists:()=>true,
    })
    await act(()=>{
        render(<BrowserRouter><Edit/></BrowserRouter>)
    })
    const element = screen.getByRole("checkbox")
    expect(element).not.toBeChecked()
})

test("if reminder is not null, input timepicker show secondSinceMidnight",async ()=>{
    (getDoc as jest.Mock).mockResolvedValue({data:()=>({
        id:"123",
        createTime:{toDate:()=>new Date("2023-09-09")},
        name:"123",
        goal:10,
        habitType:"positive",
        doneHistories:[],
        resetHistories:[],
        reminder:{send:false,secondSinceMidnight:120}
    }),exists:()=>true,
    })
    await act(()=>{
        render(<BrowserRouter><Edit/></BrowserRouter>)
    })
    const element = screen.getByTestId("time-picker")
    expect((element as HTMLSelectElement).value).toEqual("120")
})

export { }

