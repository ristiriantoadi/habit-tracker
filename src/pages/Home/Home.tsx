import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Container, Form } from "react-bootstrap"

function Home() {
  return (
    <Container style={{maxWidth:"90%",paddingTop:"20px"}}>
        <h1>Habits</h1>
        <div>
          <Button>Create Habit</Button>
          <div style={{margin:"0 5px",display:"inline",maxWidth:"500px"}}>
            <div style={{position:"relative",maxWidth:"300px",display:"inline"}}>
              <Form.Control style={{maxWidth:"300px",display:"inline"}} type="text" placeholder="Search"/>
              <FontAwesomeIcon style={{display:"inline",position: "absolute",right: "5px",top: "0px",zIndex: "9999"}} icon={faSearch} />
            </div>
          </div>
        </div>
    </Container>
  )
}

export default Home