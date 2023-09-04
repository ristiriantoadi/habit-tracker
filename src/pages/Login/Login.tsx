import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Card, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import ButtonSubmit from "../../components/ButtonSubmit"
import { auth } from "../../FirebaseConfig"
import { mapError } from "../../util/util_error"

export const handleSubmit = async():Promise<any>=>{
  try{
    const credential = await signInWithEmailAndPassword(auth,"test","something")
    return credential
  }catch(e:any){
   return e.code
  }
}

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const handleSubmit = (e:any)=>{
    e.preventDefault()
    setLoading(true)
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log("userCredential",userCredential)
      setLoading(false)
      navigate("/")
    })
    .catch((e)=>{
      Swal.fire({
        icon: 'error',
        text: mapError(e.code),
        timer: 3000, // Display for 3 seconds (adjust as needed)
      })
      setLoading(false)
    })
  }

  return (
    <Container style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}>
      <Card style={{width:"800px",margin:"0 auto"}} >
        <Card.Body>
          <h1 className="card-title" style={{textAlign:"center"}}>Habit Tracker</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control required value={password} type="password" onChange={(e)=>setPassword(e.target.value)} />
            </Form.Group>
            <div style={{display:"flex",alignItems:"center"}}>
              <ButtonSubmit loading={loading}>Login</ButtonSubmit>
              <Link style={{"marginLeft":"10px"}} to="/signup">Sign Up</Link>
            </div>
          </Form>        
        </Card.Body>
      </Card>
    </Container>

  )
}

export default Login