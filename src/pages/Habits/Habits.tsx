import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CircularLoaderBig from "../../components/CircularLoaderBig";
import PaginationComponent, { getSubsetData } from "../../components/Pagination";
import { db } from "../../FirebaseConfig";
import { HabitDB, HabitProp } from "../../models/HabitModel";
import { convertDateObjectToYearMonthDate } from "../../util/util_date";
import HabitCard from "./components/HabitCard";
import HeadingBar from "./components/HeadingBar";

function Habits() {

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || "1"
  const [habitsPage,setHabitsPage] = useState<HabitDB[]>([])
  const [loading,setLoading] = useState(false)
  const [habits,setHabits] = useState<HabitDB[]>([])
  const pageSize=1


  const getHabits = async ()=>{
    setLoading(true)
    const data = await getDocs(collection(db,"habits"))
    const habits = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as HabitDB))
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

  const convertHabitDBToProp = (item:HabitDB)=>{
    const convertedItem:HabitProp = {
        id:item.id,
        createTime:new Date(convertDateObjectToYearMonthDate((item.createTime as Timestamp).toDate())),
        name:item.name,
        goal:item.goal,
        habitType:item.habitType,
        doneHistories:item.doneHistories,
        resetHistories:item.resetHistories
    }
    return convertedItem
  }

  const resetStreak = (index:number)=>{
    let habitCopies = [...habits]
    habitCopies[index].resetHistories.push(new Date(convertDateObjectToYearMonthDate(new Date())))
    setHabits(habitCopies)
  }
  
  return (
    <div>
        <h1>Habits</h1>
        <HeadingBar></HeadingBar>
        <div style={{margin:"30px 0"}}>
          {loading === true && <CircularLoaderBig/>}
          {habitsPage.map((item,index)=><HabitCard index={index} resetStreak={resetStreak} currentDate={new Date()} key={item.id} habitProp={convertHabitDBToProp(item)}></HabitCard>)}
        </div>
        <PaginationComponent currentPage={currentPage} length={habits.length}></PaginationComponent>
    </div>
  )
}

export default Habits