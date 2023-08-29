import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import PaginationComponent, { getSubsetData } from "../../components/Pagination";
import HabitCardV2 from "./components/HabitCardV2";
import HeadingBar from "./components/HeadingBar";
import { Habit } from "./Model";

const habits = [
  {"name":"Jalan Pagi","type":"positive","goal":20,"streak":10,"estimationDate":"10 Oktober 2023"},
  {"name":"Berhenti Merokok","type":"negative","goal":40,"streak":15,"estimationDate":"10 November 2023"},
  {"name":"Minum jamu tiap pagi buta enam jam sekali berjam-jam lamanya hingga siang sudah datang menjelang dan kita bingung hari pergi ke mana","type":"negative","goal":40,"streak":15,"estimationDate":"10 November 2023"}
]

function Habits() {

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || "1"
  const [habitsPage,setHabitsPage] = useState<Habit[]>([])
  const pageSize=1

  useEffect(()=>{
    setHabitsPage(getSubsetData(parseInt(currentPage),habits))
  })
  
  return (
    <Container style={{maxWidth:"90%",paddingTop:"20px"}}>
        <h1>Habits</h1>
        <HeadingBar></HeadingBar>
        <div style={{margin:"30px 0"}}>
          {habitsPage.map(item=><HabitCardV2 habit={item}></HabitCardV2>)}
        </div>
        <PaginationComponent length={habits.length}></PaginationComponent>
    </Container>
  )
}

export default Habits