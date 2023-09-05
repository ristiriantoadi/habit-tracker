import { collection, deleteDoc, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import CircularLoaderBig from "../../components/CircularLoaderBig";
import PaginationComponent, { getSubsetData } from "../../components/Pagination";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../FirebaseConfig";
import { HabitDB, HabitProp } from "../../models/HabitModel";
import { convertDateObjectToYearMonthDate, getCurrentDate } from "../../util/util_date";
import { mapError } from "../../util/util_error";
import { filterHabitsByIsDone, filterHabitsByName, getCurrentStreak, getEstimatedDate, isHabitDone } from "../../util/util_habit";
import HabitCard from "./components/HabitCard";
import HeadingBar from "./components/HeadingBar";

function Habits() {

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || "1"
  const [habitsPage,setHabitsPage] = useState<HabitDB[]>([])
  const [loading,setLoading] = useState(false)
  const [habits,setHabits] = useState<HabitDB[]>([])
  const [habitsFiltered,setHabitsFiltered] = useState<HabitDB[]>([])
  const {currentUser} = useContext(AuthContext)

  const getHabits = async ()=>{
    setLoading(true)
    const q = query(collection(db, "habits"), where("userId", "==", currentUser?.uid));
    
    try{
      const data = await getDocs(q)
      const habits = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as HabitDB))
      setHabits(habits)
      setHabitsFiltered(habits)
    }catch(e:any){
      Swal.fire({
          icon: 'error',
          text: mapError(e.toString),
          timer: 3000, // Display for 3 seconds (adjust as needed)
        })
    }
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
        streak:getCurrentStreak(item),
        estimatedDate:getEstimatedDate(item,getCurrentStreak(item)),
        isDone:isHabitDone(item,getCurrentStreak(item))
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

  const filterData = (text:string,isDone?:boolean)=>{
    let results=filterHabitsByName(habits,text)
    if (isDone !== undefined){
      results = filterHabitsByIsDone(results,isDone)
    }
    setHabitsFiltered(results)
  }

  const deleteHabit = async (id:string)=>{
    try{
      await deleteDoc(doc(db, "habits", id));
    }catch(e:any){
      Swal.fire({
        icon: 'error',
        text: mapError(e.toString()),
        timer: 3000, // Display for 3 seconds (adjust as needed)
      })
      return
    }

    const habitsAfterDelete = habits.filter(habit => habit.id !== id);
    setHabits(habitsAfterDelete)


    const habitsFilteredAfterDelete = habitsFiltered.filter(habit => habit.id !== id)
    setHabitsFiltered(habitsFilteredAfterDelete)


  }
  
  return (
    <div>
        <h1>Habits</h1>
        <HeadingBar filterData={filterData}></HeadingBar>
        <div style={{margin:"30px 0"}}>
          {loading === true && <CircularLoaderBig/>}
          {habitsPage.map((item,index)=><HabitCard doHabit={doHabit} index={index} resetStreak={resetStreak} currentDate={getCurrentDate()} key={item.id} habitProp={convertHabitDBToProp(item)} deleteHabit={deleteHabit}></HabitCard>)}
        </div>
        <PaginationComponent currentPage={currentPage} length={habitsFiltered.length}></PaginationComponent>
    </div>
  )
}

export default Habits