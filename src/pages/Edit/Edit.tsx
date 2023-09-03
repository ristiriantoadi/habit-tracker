import { useState } from "react";
import { Form } from "react-bootstrap";
import ButtonSubmit from "../../components/ButtonSubmit";

function Edit() {
    const [name,setName] = useState("")
    const [goal,setGoal] = useState(0)
    const [loading,setLoading] = useState(false)

    const handleSubmit = ()=>{

    }


    return (
        <div>
            <h1>Edit</h1>
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
                        <span data-testid="estimation-date">{"10 Oktober 2023"}</span>
                        </div>
                    </div>
                </Form.Group>
                <ButtonSubmit loading={loading}>Submit</ButtonSubmit>
            </Form>
        </div>
    )
}

export default Edit