import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Button, Card, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../FirebaseConfig"

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e:any)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password)
    .then(()=>{
      console.log("login success")
      navigate("/")
    })
    .catch((e)=>{console.log("login fail",e)})
  }

  return (
    <Container style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}>
      <Card style={{width:"800px",margin:"0 auto"}} >
        <Card.Body>
          <h1 className="card-title" style={{textAlign:"center"}}>Habit Tracker</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} type="password" onChange={(e)=>setPassword(e.target.value)} />
            </Form.Group>
            <div style={{display:"flex",alignItems:"center"}}>
              <Button type="submit">Login</Button>
              <Link style={{"marginLeft":"10px"}} to="/signup">Sign Up</Link>
            </div>
          </Form>        
        </Card.Body>
      </Card>
    </Container>

  )
}

export default Login