import { fireEvent, render, screen } from "@testing-library/react"
import { getFutureDateFromToday } from "../../util/util_date"
import CreateEdit from "./CreateEdit"

describe("CreateEdit",()=>{
    test("if goal is n, then estimated date is today + n days",()=>{
        render(<CreateEdit title={"Create Habit"}></CreateEdit>)
        const n = 120
        fireEvent.change(screen.getByTestId("goal-input"),{target:{value:n}})
        expect(getFutureDateFromToday(n).getDate()).toEqual(new Date(screen.getByTestId("estimation-date").innerHTML).getDate())
    })
})

export { }
