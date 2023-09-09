import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { getFutureDateFromToday } from "../../util/util_date"
import Create from "./Create"

describe("CreateEdit",()=>{
    test("if goal is n, then estimated date is today + n days",()=>{
        render(<BrowserRouter><Create></Create></BrowserRouter>)
        const n = 120
        fireEvent.change(screen.getByTestId("goal-input"),{target:{value:n}})
        expect(getFutureDateFromToday(n).getDate()).toEqual(new Date(screen.getByTestId("estimation-date").innerHTML).getDate())
    })
})

test("if positive habit is chosen, show reminder input",()=>{
    render(<BrowserRouter><Create></Create></BrowserRouter>)
    fireEvent.click(screen.getByTestId("positive-checkbox"))
    screen.getByTestId("reminder-input")
})

test("if negative habit is chosen, dont show reminder input",()=>{
    render(<BrowserRouter><Create></Create></BrowserRouter>)
    fireEvent.click(screen.getByTestId("negative-checkbox"))
    const input = screen.queryByTestId("reminder-input")
    expect(input).toBe(null)
})


export { }
