import { useState } from "react"
import { Form } from "react-bootstrap"
import ButtonSubmit from "../../components/ButtonSubmit"

interface Props{
    title:string
}


function CreateEdit({title}:Props) {

    const [loading,setLoading] = useState(false)
    const [name,setName] = useState("")
    const [goal,setGoal] = useState(1)
    
    const handleSubmit = (e:any)=>{
        e.preventDefault()
    }
    

  return (
    <div>
        <h1>{title}</h1>
        <Form onSubmit={handleSubmit} style={{maxWidth:"600px"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control required placeholder="Excercise" value={name} onChange={(e)=>setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Goal</Form.Label>
                <div style={{display:"flex",alignItems:"center"}}>
                    <Form.Control style={{width:"30%"}} required type="number" value={goal} onChange={(e)=>setGoal(parseInt(e.target.value))} />
                    <div style={{marginLeft:"20px"}}>
                    <span style={{display:"block"}}>Estimated end date:</span>
                    <span>October 10th 2023</span>
                    </div>
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{display:"flex",alignItems:"center"}}>
                <Form.Label>Habit Type</Form.Label>
                <div style={{marginLeft:"20px"}}>
                    <Form.Check
                        type="radio"
                        label="Positive"
                    />
                    <Form.Check
                        type="radio"
                        label="Negative"
                    />
                </div>
            </Form.Group>
              <ButtonSubmit loading={loading}>Create</ButtonSubmit>
          </Form>
    </div>
  )
}

export default CreateEdit