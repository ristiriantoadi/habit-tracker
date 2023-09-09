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

export { }
