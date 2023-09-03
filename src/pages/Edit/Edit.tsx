import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ButtonSubmit from "../../components/ButtonSubmit";
import CircularLoaderBig from "../../components/CircularLoaderBig";
import { db } from "../../FirebaseConfig";
import { addDate, convertDateObjectToYearMonthDate, getCurrentDate } from "../../util/util_date";
import { getCurrentStreakNegativeHabit, getCurrentStreakPositiveHabit } from "../../util/util_habit";

interface UpdateData{
    name:string
    goal:number
    isDone?:boolean
}

function Edit() {
    const [name,setName] = useState("")
    const [goal,setGoal] = useState(0)
    const [loading,setLoading] = useState(false)
    const [submitLoading,setSubmitLoading] = useState(false)
    const [habitType,setHabitType] = useState("-")
    const [currentStreak,setCurrentStreak] = useState(0)
    const [estimationDate,setEstimationDate] = useState("")
    const {idHabit} = useParams()
    const docRef = doc(db, "habits/"+idHabit);
    const navigate = useNavigate()

    const handleSubmit = async (e:any)=>{ 
        e.preventDefault()
        setSubmitLoading(true)
        let updateData:UpdateData = {name:name,goal:goal}
        if (habitType == "positive"){
            updateData.isDone=false
            console.log("current streak",currentStreak)
            console.log("goal",goal)
            if (currentStreak === goal) updateData.isDone = true
        }
        console.log(updateData)
        await updateDoc(docRef,(updateData as any))
        setSubmitLoading(false)
        navigate("/habits")
    }

    const getCurrentStreak = (data:any)=>{
        const currentDate = getCurrentDate()
        let streak=0
        if (data.habitType == "positive"){
            const doneHistories = data.doneHistories.map((h:Timestamp)=>new Date(convertDateObjectToYearMonthDate(h.toDate())))
            streak = getCurrentStreakPositiveHabit(doneHistories,currentDate) 
            if (data.isDone === true){
                streak=data.goal
            }
        }else{
            const resetHistories = data.resetHistories.map((h:Timestamp)=>new Date(convertDateObjectToYearMonthDate(h.toDate())))
            const startDate = new Date(convertDateObjectToYearMonthDate(data.createTime.toDate()))
            streak = getCurrentStreakNegativeHabit(resetHistories,startDate,currentDate)
        }
        return streak
    }

    const getHabit = async ()=>{
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
                        <Form.Control data-testid="goal-input" style={{width:"30%"}} required type="number" min={currentStreak > 0 ? currentStreak:1} value={goal} onChange={(e)=>setGoal(parseInt(e.target.value))} />
                        <div style={{marginLeft:"20px"}}>
                        <span style={{display:"block"}}>Estimated end date:</span>
                        <span data-testid="estimation-date">{estimationDate}</span>
                        </div>
                    </div>
                </Form.Group>
                <ButtonSubmit loading={submitLoading}>Submit</ButtonSubmit>
            </Form>
        </div>
    )
}

export default Edit