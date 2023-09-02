// import { act } from "react-dom/test-utils"

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

export { }
