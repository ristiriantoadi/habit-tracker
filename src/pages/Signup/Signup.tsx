
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Card, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import "../../App.css"
import ButtonSubmit from "../../components/ButtonSubmit"
import { auth } from "../../FirebaseConfig"
import { mapError } from "../../util/util_error"

function Signup() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [errorConfirmPassword,setErrorConfirmPassword]=useState(false)
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const isPasswordMatch = ()=>{
    if (password !== confirmPassword){
      setErrorConfirmPassword(true)
      return false
    }else {
      setErrorConfirmPassword(false)
      return true
    }
  }

  const handleChangeConfirmPassword = (e:any)=>{
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = (e:any)=>{
    e.preventDefault()
    if (isPasswordMatch() === false){
      return
    }
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate("/habits")
    }) 
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        text: mapError(e.code),
        timer: 3000, // Display for 3 seconds (adjust as needed)
      })
      setLoading(false)
      });
  }

  return (
    <Container style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}>
      <Card style={{width:"800px",margin:"0 auto"}} >
        <Card.Body>
          <h1 style={{textAlign:"center"}}>Habit Tracker</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <Form.Label>Confirm Password</Form.Label>{errorConfirmPassword && <span style={{color:"#FF0000",fontWeight:"600",fontSize:"14px",padding:"5px 5px"}}>*Password doesn't match</span>}
              </div>
              <Form.Control value={confirmPassword} onChange={handleChangeConfirmPassword} required type="password" />
            </Form.Group>
            <div style={{display:"flex",alignItems:"center"}}>
            <ButtonSubmit loading={loading}>Sign Up</ButtonSubmit>
              <Link style={{"marginLeft":"10px"}} to="/login">Login</Link>
            </div>
          </Form>        
        </Card.Body>
      </Card>
    </Container>

  )
}

export default Signup