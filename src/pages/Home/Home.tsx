import { Container } from "react-bootstrap"
import HabitCardV2 from "./components/HabitCardV2"
import HeadingBar from "./components/HeadingBar"

function Home() {

  const habits = [
    {"name":"Jalan Pagi","type":"positive","goal":20,"streak":10,"estimationDate":"10 Oktober 2023"},
    {"name":"Berhenti Merokok","type":"negative","goal":40,"streak":15,"estimationDate":"10 November 2023"},
    {"name":"Minum jamu tiap pagi buta enam jam sekali berjam-jam lamanya hingga siang sudah datang menjelang dan kita bingung hari pergi ke mana","type":"negative","goal":40,"streak":15,"estimationDate":"10 November 2023"}
  ]

  return (
    <Container style={{maxWidth:"90%",paddingTop:"20px"}}>
        <h1>Habits</h1>
        <HeadingBar></HeadingBar>
        <div style={{margin:"30px 0"}}>
          {habits.map(item=><HabitCardV2 habit={item}></HabitCardV2>)}
          {/* <HabitCardV2></HabitCardV2> */}
        </div>
    </Container>
  )
}

export default Home