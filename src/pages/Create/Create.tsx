import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import ButtonSubmit from "../../components/ButtonSubmit";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../FirebaseConfig";
import { HabitInput } from "../../models/HabitModel";
import { getFutureDateFromToday } from "../../util/util_date";
import { mapError } from "../../util/util_error";


interface Props{
    title:string
}


function Create() {

    const [loading,setLoading] = useState(false)
    const [name,setName] = useState("")
    const [goal,setGoal] = useState(1)
    const [habitType,setHabitType] = useState("positive")
    const [reminderTime,setReminderTime] = useState(0)
    const [sendReminder,setSendReminder] = useState(false)
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)

    const handleSubmit = async (e:any)=>{
        e.preventDefault()
        const data:HabitInput = {
            "name":name,"goal":goal,userId:currentUser?.uid,"habitType":habitType,doneHistories:[],resetHistories:[],createTime:serverTimestamp()
        }
        if (data.habitType == "positive"){
            data.reminder = {
                send:sendReminder,
                secondSinceMidnight:reminderTime,
                timezone:Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }
        setLoading(true)
        try{
            await addDoc(collection(db,"habits"),data)
        }catch(e:any){
            Swal.fire({
                icon: 'error',
                text: mapError(e.toString()),
                timer: 3000, // Display for 3 seconds (adjust as needed)
              })
        }
        setLoading(false)
        navigate("/habits")
    }

    const getEstimationDate = ()=>{
        const futureDate = getFutureDateFromToday(goal)
        return futureDate.toDateString()
    }
    
    const handleChangeReminderTime=(time:number)=>{
        setReminderTime(time)
        console.log(time)
    }
    

  return (
    <div>
        <h1>Create</h1>
        <Form onSubmit={handleSubmit} style={{maxWidth:"600px"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control required placeholder="Excercise" value={name} onChange={(e)=>setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Goal</Form.Label>
                <div style={{display:"flex",alignItems:"center"}}>
                    <Form.Control data-testid="goal-input" style={{width:"30%"}} required type="number" min={1} value={goal} onChange={(e)=>setGoal(parseInt(e.target.value))} />
                    <div style={{marginLeft:"20px"}}>
                    <span style={{display:"block"}}>Estimated end date:</span>
                    <span data-testid="estimation-date">{getEstimationDate()}</span>
                    </div>
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{display:"flex",alignItems:"center"}}>
                <Form.Label>Habit Type</Form.Label>
                <div style={{marginLeft:"20px"}}>
                    <Form.Check
                        data-testid="positive-checkbox"
                        checked={habitType === "positive"}
                        type="radio"
                        label="Positive"
                        name="habit-type"
                        value="positive"
                        onChange={(e)=>{
                            setHabitType(e.target.value)}
                            
                        }
                    />
                    <Form.Check
                        data-testid="negative-checkbox"
                        checked={habitType === "negative"}
                        type="radio"
                        name="habit-type"
                        label="Negative"
                        value="negative"
                        onChange={(e)=>setHabitType(e.target.value)}
                    />
                </div>
            </Form.Group>
            {habitType == "positive" &&
                <Form.Group data-testid="reminder-input" className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Reminder</Form.Label>
                    <Form.Check
                            type="checkbox"  
                            label="Send reminder"
                            onChange={e=>setSendReminder(e.target.checked)}                  
                    />
                    <TimePicker value={reminderTime} onChange={handleChangeReminderTime} format={24} step={1} />
                </Form.Group>
            }
              <ButtonSubmit loading={loading}>Submit</ButtonSubmit>
          </Form>
    </div>
  )
}

export default Create;