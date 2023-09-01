import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { handleSubmit } from "./Login"

jest.mock("firebase/auth",() => {
    return {
      auth: jest.fn().mockReturnThis(),
      signInWithEmailAndPassword: jest.fn(),
      getAuth: jest.fn()
    }
})

describe("Login",()=>{
  it("login success",async ()=>{
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({"user":{"email":"risti@gmail.com"}})
      const data = await handleSubmit()
      expect((data as UserCredential).user.email).toEqual("risti@gmail.com")
  })

  test("login fails",async ()=>{
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new FirebaseError("auth/wrong-password","something"))
    const data = await handleSubmit()
    expect(data).toEqual("auth/wrong-password")
  })

})



export { }
