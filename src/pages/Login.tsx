import { Button, Card, Container, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

function Login() {
  return (
    <Container style={{maxWidth:"90%",paddingTop:"20px"}}>
      <Card style={{maxWidth:"800px",margin:"0 auto"}} >
        <Card.Body>
          <h1 style={{textAlign:"center"}}>Login</h1>
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
              <Link style={{"marginLeft":"10px"}} to="/signup">Daftar</Link>
            </div>
          </Form>        
        </Card.Body>
      </Card>
    </Container>

  )
}

export default Login