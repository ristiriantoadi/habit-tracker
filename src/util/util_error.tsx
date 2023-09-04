export const mapError = (e:string)=>{
    console.log("error",e)
    if (e === "auth/too-many-requests") return "Too many Requests. Please Reset Password"
    if (e === "auth/user-not-found") return "User not found" 
    if (e === "auth/wrong-password") return "Wrong password"
    if (e === "auth/email-already-in-use") return "Email already in use"
    if (e === "auth/weak-password") return "Password should be at least 6 characters"
    return "Something wrong happened"
}