import { Button, Card, Container, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

function Login() {
  return (
    <Container style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}>
      <Card style={{width:"800px",margin:"0 auto"}} >
        <Card.Body>
          <h1 className="card-title" style={{textAlign:"center"}}>Habit Tracker</h1>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
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