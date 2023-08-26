import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Container, Form } from "react-bootstrap"

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
        <div style={{margin:"30px 0"}}>
          <Card style={{marginBottom:"30px"}}>
            <Card.Body style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{width:"50%",display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                <span style={{marginRight:"5px",minWidth:"80px",textAlign:"center"}}>Lari Pagi</span>
                <div style={{marginRight:"5px",minWidth:"80px",textAlign:"center"}}>
                  <input className="form-check-input" type="checkbox" id="flexCheckDefault" style={{width:"30px",height:"30px",marginRight:"10px"}}></input>
                </div>
                <div style={{marginRight:"5px",minWidth:"80px",textAlign:"center"}}>
                  <label style={{fontWeight:"600",display:"block"}}>Streak</label>
                  <span>0</span>
                </div>
                <div style={{marginRight:"5px",minWidth:"80px",textAlign:"center"}}>
                  <label style={{fontWeight:"600",display:"block"}}>Goal</label>
                  <span>30</span>
                </div>
                <div style={{marginRight:"5px",minWidth:"80px",textAlign:"center"}}>
                  <label style={{fontWeight:"600",display:"block"}}>Estimated End Date</label>
                  <span>10 September 2023</span>
                </div>
              </div>
              <span style={{color:"#03A9F4",textAlign:"center",width:"150px"}}>
                POSITIVE
              </span>
            </Card.Body>
          </Card>
          <Card style={{marginBottom:"30px"}}>
            <Card.Body style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{width:"50%",display:"flex",alignItems:"center"}}>
                <span style={{marginRight:"30px",padding:"0 20px"}}>Lari Pagi</span>
                {/* <div style={{marginRight:"30px",display:"flex",alignItems:"center"}}>
                  <input className="form-check-input" type="checkbox" id="flexCheckDefault" style={{width:"30px",height:"30px",marginRight:"10px"}}></input>
                  <h6 style={{margin:"0px"}}>20</h6>
                </div> */}
                <div style={{marginRight:"30px",marginBottom:"0",padding:"0 20px",textAlign:"center"}}>
                  <label style={{fontWeight:"600",display:"block"}}>Streak</label>
                  <span>0</span>
                </div>
                <div style={{marginRight:"30px",marginBottom:"0",padding:"0 20px",textAlign:"center"}}>
                  <label style={{fontWeight:"600",display:"block"}}>Goal</label>
                  <span>30</span>
                </div>
                <div style={{marginRight:"30px",marginBottom:"0",padding:"0 20px",textAlign:"center"}}>
                  <label style={{fontWeight:"600",display:"block"}}>Estimated End Date</label>
                  <span>10 September 2023</span>
                </div>
              </div>
              <span style={{color:"#FFC400",textAlign:"center",width:"150px"}}>
                NEGATIVE
              </span>
            </Card.Body>
          </Card>
        </div>
    </Container>
  )
}

export default Home