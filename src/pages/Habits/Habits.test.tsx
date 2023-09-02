import { act, fireEvent, render, screen } from "@testing-library/react"
import { getDocs, Timestamp } from "firebase/firestore"
// import { act } from "react-dom/test-utils"
import { BrowserRouter } from "react-router-dom"
import Habits from "./Habits"

jest.mock("firebase/firestore",() => {
    return {
        ...jest.requireActual('firebase/firestore'),
        getDocs:jest.fn(),
        collection:jest.fn()
      
    }
})

test("on click reset button, streak goes back to 0",async ()=>{
    (getDocs as jest.Mock).mockResolvedValue({"docs":[
        {"id":1,data:()=>({"name":"Merokok","createTime":Timestamp.fromDate(new Date("2023-08-28")),"goal":10,"habitType":"negative","doneHistories":[],"resetHistories":[]})}]})
    act(()=>{
        render(
            <BrowserRouter>
                <Habits></Habits>
            </BrowserRouter>
        )
    })
    const button = await screen.findByTestId("button-reset")
    fireEvent.click(button)
    const streak = screen.getByTestId("streak")
    expect(streak.innerHTML).toEqual("0")
})

export { }
