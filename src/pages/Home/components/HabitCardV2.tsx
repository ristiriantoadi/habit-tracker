import { faEdit, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'react-bootstrap'
import style from "./HabitCardV2.module.css"

interface Habit{
    name:String
    type:String
    goal:Number
    streak:Number
    estimationDate:String
}

interface Props{
    habit:Habit
}

function HabitCardV2({habit}:Props) {
  return (
    <div>
        <Card className={`${style.small} ${style.card}`}>
            <Card.Body style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                <div style={{width:"70%"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:"30px"}}>
                        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                            <span style={{marginRight:"15px"}}>{habit.name}</span>
                            {habit.type === "positive" ? <input style={{width:"30px",height:"30px",marginRight:"10px"}} className={`form-check-input`} type="checkbox"></input>:<button style={{color:"#D50000",border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon icon={faRefresh}/><span style={{marginLeft:"5px"}}>RESET</span></button>}
                        </div>
                        {habit.type == "positive"? <span className={style.positive}>Positive Habit</span>:<span className={style.negative}>Negative Habit</span>} 
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px"}}>
                        <div style={{display:"flex",flexFlow:"column"}}>
                            <label style={{fontWeight:"600"}}>Streak</label>
                            <span>10</span>
                        </div>
                        <div style={{display:"flex",flexFlow:"column"}}>
                            <label style={{fontWeight:"600"}}>Goal</label>
                            <span>10</span>
                        </div>
                        <div style={{display:"flex",flexFlow:"column"}}>
                            <label style={{fontWeight:"600"}}>Estimation Date</label>
                            <span>10 Oktober 2023</span>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex",flexFlow:"column"}}>
                    <button style={{border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon style={{width:"25px","height":"25px",marginBottom:"5px",color:"#007BFF"}} icon={faEdit}></FontAwesomeIcon></button>
                    <button style={{border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon style={{width:"25px","height":"25px",color:"#FF0000"}} icon={faTrash}></FontAwesomeIcon></button>
                </div>
            </Card.Body>
        </Card>
        <Card className={`${style.big} ${style.card}`}>
            <Card.Body style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",width:"70%",justifyContent:"space-between"}}>
                    <div style={{width:"80%",display:"flex"}}>
                        <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                            <span style={{marginRight:"20px",minWidth:"100px"}}>Jalan Kaki</span>
                            {habit.type === "positive" ? <input style={{width:"30px",height:"30px",marginRight:"10px"}} className={`form-check-input`} type="checkbox"></input>:<button style={{color:"#D50000",border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon icon={faRefresh}/><span style={{marginLeft:"5px"}}>RESET</span></button>}
                        </div>
                        <div style={{display:"flex",marginLeft:"60px",width:"60%",minWidth:"400px"}}>
                            <div style={{display:"flex", marginRight:"60px",flexFlow:"column"}}>
                                <label style={{fontWeight:"600"}}>Streak</label>
                                <span>10</span>
                            </div>
                            <div style={{display:"flex",flexFlow:"column",marginRight:"60px",}}>
                                <label style={{fontWeight:"600"}}>Goal</label>
                                <span>10</span>
                            </div>
                            <div style={{display:"flex",flexFlow:"column",marginRight:"60px",}}>
                                <label style={{fontWeight:"600"}}>Estimation Date</label>
                                <span>10 Oktober 2023</span>
                            </div>
                        </div>
                    </div>
                    {habit.type == "positive"? <span className={style.positive}>Positive Habit</span>:<span className={style.negative}>Negative Habit</span>} 
                </div>
                <div style={{display:"flex"}}>
                    <button style={{border:"none",backgroundColor: "inherit",marginRight:"20px"}}><FontAwesomeIcon style={{width:"25px","height":"25px",color:"#007BFF"}} icon={faEdit}></FontAwesomeIcon></button>
                    <button style={{border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon style={{width:"25px","height":"25px",color:"#FF0000"}} icon={faTrash}></FontAwesomeIcon></button>
                </div>
            </Card.Body>
        </Card>
    </div>

  )
}

export default HabitCardV2