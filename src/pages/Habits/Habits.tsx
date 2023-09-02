import { collection, doc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CircularLoaderBig from "../../components/CircularLoaderBig";
import PaginationComponent, { getSubsetData } from "../../components/Pagination";
import { db } from "../../FirebaseConfig";
import { HabitDB, HabitProp } from "../../models/HabitModel";
import { convertDateObjectToYearMonthDate } from "../../util/util_date";
import HabitCard from "./components/HabitCard";
import HeadingBar from "./components/HeadingBar";

export const filterText = (habits:HabitDB[],text:string)=>{
  const regex = new RegExp(text, "i")
  const habitsFiltered = habits.filter((habit) => regex.test(habit.name));
  return habitsFiltered

}

function Habits() {

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || "1"
  const [habitsPage,setHabitsPage] = useState<HabitDB[]>([])
  const [loading,setLoading] = useState(false)
  const [habits,setHabits] = useState<HabitDB[]>([])
  const [habitsFiltered,setHabitsFiltered] = useState<HabitDB[]>([])

  const getHabits = async ()=>{
    setLoading(true)
    const data = await getDocs(collection(db,"habits"))
    const habits = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as HabitDB))
    console.log("habits",habits)
    setHabits(habits)
    setHabitsFiltered(habits)
    setLoading(false)
    setHabitsPage(getSubsetData(parseInt(currentPage),habits))
  }

  useEffect(()=>{
    getHabits()
  },[])

  useEffect(()=>{
    setHabitsPage(getSubsetData(parseInt(currentPage),habitsFiltered))
  },[currentPage,habitsFiltered])


  const convertHabitDBToProp = (item:HabitDB)=>{
    const convertedItem:HabitProp = {
        id:item.id,
        createTime:new Date(convertDateObjectToYearMonthDate((item.createTime as Timestamp).toDate())),
        name:item.name,
        goal:item.goal,
        habitType:item.habitType,
        doneHistories:item.doneHistories.map(h=>new Date(convertDateObjectToYearMonthDate((h as Timestamp).toDate()))),
        resetHistories:item.resetHistories.map(h=>new Date(convertDateObjectToYearMonthDate((h as Timestamp).toDate()))),
        isDone:item.isDone
    }
    return convertedItem
  }

  const resetStreak = async (id:string)=>{
    let habitCopies = [...habits]
    let index = habitCopies.findIndex((e)=>e.id === id)
    habitCopies[index].resetHistories.push(Timestamp.fromDate(new Date()))
    const ref = doc(db, "habits", habitCopies[index].id);
    await updateDoc(ref,{"resetHistories":habitCopies[index].resetHistories})

    setHabits(habitCopies)
  }

  const doHabit = async (id:string,currentStreak:number)=>{
    let habitCopies = [...habits]
    let index = habitCopies.findIndex((e)=>e.id === id)
    habitCopies[index].doneHistories.push(Timestamp.fromDate(new Date()))
    const ref = doc(db, "habits", habitCopies[index].id)
    if (currentStreak+1 == habitCopies[index].goal){
      habitCopies[index].isDone=true
      await updateDoc(ref,{"doneHistories":habitCopies[index].doneHistories,"isDone":true})
    }else{
      await updateDoc(ref,{"doneHistories":habitCopies[index].doneHistories})
    }
    setHabits(habitCopies)
  }

  const filterData = (text:string)=>{
    const habitsFiltered=filterText(habits,text)
    setHabitsFiltered(habitsFiltered)
  }
  
  return (
    <div>
        <h1>Habits</h1>
        <HeadingBar filterData={filterData}></HeadingBar>
        <div style={{margin:"30px 0"}}>
          {loading === true && <CircularLoaderBig/>}
          {habitsPage.map((item,index)=><HabitCard doHabit={doHabit} index={index} resetStreak={resetStreak} currentDate={new Date(convertDateObjectToYearMonthDate(new Date()))} key={item.id} habitProp={convertHabitDBToProp(item)}></HabitCard>)}
        </div>
        <PaginationComponent currentPage={currentPage} length={habitsFiltered.length}></PaginationComponent>
    </div>
  )
}

export default Habits