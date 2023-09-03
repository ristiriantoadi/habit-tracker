import { fireEvent, render, screen } from "@testing-library/react"
import { getFutureDateFromToday } from "../../util/util_date"
import Create from "./Create"

describe("CreateEdit",()=>{
    test("if goal is n, then estimated date is today + n days",()=>{
        render(<Create title={"Create Habit"}></Create>)
        const n = 120
        fireEvent.change(screen.getByTestId("goal-input"),{target:{value:n}})
        expect(getFutureDateFromToday(n).getDate()).toEqual(new Date(screen.getByTestId("estimation-date").innerHTML).getDate())
    })
})

export { }
