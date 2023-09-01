import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CircularLoaderBig from "../../components/CircularLoaderBig";
import PaginationComponent, { getSubsetData } from "../../components/Pagination";
import { db } from "../../FirebaseConfig";
import { HabitReceived } from "../../models/Habit";
import HabitCardV2 from "./components/HabitCardV2";
import HeadingBar from "./components/HeadingBar";
// import { HabitInput } from "./Model";

const habits = [
  {"name":"Jalan Pagi","type":"positive","goal":20,"streak":10,"estimationDate":"10 Oktober 2023"},
  {"name":"Berhenti Merokok","type":"negative","goal":40,"streak":15,"estimationDate":"10 November 2023"},
  {"name":"Minum jamu tiap pagi buta enam jam sekali berjam-jam lamanya hingga siang sudah datang menjelang dan kita bingung hari pergi ke mana","type":"negative","goal":40,"streak":15,"estimationDate":"10 November 2023"}
]

function Habits() {

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || "1"
  const [habitsPage,setHabitsPage] = useState<HabitReceived[]>([])
  const [loading,setLoading] = useState(false)
  const [habits,setHabits] = useState<HabitReceived[]>([])
  const pageSize=1

  const getHabits = async ()=>{
    setLoading(true)
    const data = await getDocs(collection(db,"habits"))
    const habits = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as HabitReceived))
    setHabits(habits)
    setLoading(false)
    setHabitsPage(getSubsetData(parseInt(currentPage),habits))
  }

  useEffect(()=>{
    getHabits()
  },[])

  useEffect(()=>{
    setHabitsPage(getSubsetData(parseInt(currentPage),habits))
  },[currentPage])
  
  return (
    <div>
        <h1>Habits</h1>
        <HeadingBar></HeadingBar>
        <div style={{margin:"30px 0"}}>
          {loading === true && <CircularLoaderBig/>}
          {habitsPage.map(item=><HabitCardV2 habit={item}></HabitCardV2>)}
        </div>
        <PaginationComponent currentPage={currentPage} length={habits.length}></PaginationComponent>
    </div>
  )
}

export default Habits