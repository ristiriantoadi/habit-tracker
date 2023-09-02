// import { act } from "react-dom/test-utils"

jest.mock("firebase/firestore",() => {
    return {
        ...jest.requireActual('firebase/firestore'),
        getDocs:jest.fn(),
        collection:jest.fn(),
        // path:{indexOf:jest.fn()}
      
    }
})

test("on click reset button, streak goes back to 0",async ()=>{
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
    // fireEvent.click(buttons[0])
    // const streak = screen.getByTestId("streak")
    // expect(streak.innerHTML).toEqual("0")
})

export { }
