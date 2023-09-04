import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import ButtonSubmit from "../../components/ButtonSubmit";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../FirebaseConfig";
import { HabitInput } from "../../models/HabitModel";
import { getFutureDateFromToday } from "../../util/util_date";

interface Props{
    title:string
}


function Create() {

    const [loading,setLoading] = useState(false)
    const [name,setName] = useState("")
    const [goal,setGoal] = useState(1)
    const [habitType,setHabitType] = useState("positive")
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)

    const handleSubmit = async (e:any)=>{
        e.preventDefault()
        const data:HabitInput = {
            "name":name,"goal":goal,userId:currentUser?.uid,"habitType":habitType,doneHistories:[],resetHistories:[],createTime:serverTimestamp()
        }
        setLoading(true)
        await addDoc(collection(db,"habits"),data)
        setLoading(false)
        navigate("/habits")
    }

    const getEstimationDate = ()=>{
        const futureDate = getFutureDateFromToday(goal)
        return futureDate.toDateString()
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
                        checked={habitType === "negative"}
                        type="radio"
                        name="habit-type"
                        label="Negative"
                        value="negative"
                        onChange={(e)=>setHabitType(e.target.value)}
                    />
                </div>
            </Form.Group>
              <ButtonSubmit loading={loading}>Submit</ButtonSubmit>
          </Form>
    </div>
  )
}

export default Create;