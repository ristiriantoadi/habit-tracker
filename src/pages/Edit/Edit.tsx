import { doc, getDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router";
import ButtonSubmit from "../../components/ButtonSubmit";
import CircularLoaderBig from "../../components/CircularLoaderBig";
import { db } from "../../FirebaseConfig";
import { addDate, convertDateObjectToYearMonthDate, getCurrentDate } from "../../util/util_date";
import { getCurrentStreakNegativeHabit, getCurrentStreakPositiveHabit } from "../Habits/components/HabitCard";

function Edit() {
    const [name,setName] = useState("")
    const [goal,setGoal] = useState(0)
    const [loading,setLoading] = useState(false)
    const [habitType,setHabitType] = useState("-")
    const [currentStreak,setCurrentStreak] = useState(0)
    const [estimationDate,setEstimationDate] = useState("")
    const {idHabit} = useParams()

    const handleSubmit = ()=>{

    }

    const getCurrentStreak = (data:any)=>{
        const currentDate = getCurrentDate()
        let streak=0
        if (data.habitType == "positive"){
            const doneHistories = data.doneHistories.map((h:Timestamp)=>new Date(convertDateObjectToYearMonthDate(h.toDate())))
            streak = getCurrentStreakPositiveHabit(doneHistories,currentDate) 
        }else{
            const resetHistories = data.resetHistories.map((h:Timestamp)=>new Date(convertDateObjectToYearMonthDate(h.toDate())))
            const startDate = new Date(convertDateObjectToYearMonthDate(data.createTime.toDate()))
            streak = getCurrentStreakNegativeHabit(resetHistories,startDate,currentDate)
        }
        return streak
    }

    const getHabit = async ()=>{
        const docRef = doc(db, "habits/"+idHabit);
        setLoading(true)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data()
            
            setEstimationDate(addDate(getCurrentDate(),(data.goal-getCurrentStreak(data))).toDateString())
            setCurrentStreak(getCurrentStreak(data))            
            setName(data.name)
            setGoal(data.goal)
            setHabitType(data.habitType)
            setLoading(false)

        } else {
            console.log("No such document!");
        }
    }

    useEffect(()=>{
        setEstimationDate(addDate(getCurrentDate(),(goal-currentStreak)).toDateString())
    },[goal])

    useEffect(()=>{
        getHabit()
    },[])


    return (
        <div>
            <h1>Edit</h1>
            {loading === true && <CircularLoaderBig/>}
            <Form onSubmit={handleSubmit} style={{maxWidth:"600px"}}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control required placeholder="Excercise" value={name} onChange={(e)=>setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Current Streak</Form.Label>
                    <div>{currentStreak}</div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Habit Type</Form.Label>
                    <div>{habitType[0].toUpperCase()+habitType.slice(1)}</div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Goal</Form.Label>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <Form.Control data-testid="goal-input" style={{width:"30%"}} required type="number" min={currentStreak} value={goal} onChange={(e)=>setGoal(parseInt(e.target.value))} />
                        <div style={{marginLeft:"20px"}}>
                        <span style={{display:"block"}}>Estimated end date:</span>
                        <span data-testid="estimation-date">{estimationDate}</span>
                        </div>
                    </div>
                </Form.Group>
                <ButtonSubmit loading={loading}>Submit</ButtonSubmit>
            </Form>
        </div>
    )
}

export default Edit