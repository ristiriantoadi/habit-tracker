import { faEdit, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'react-bootstrap'
import style from "./HabitCard.module.css"

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

function HabitCard({habit}:Props) {
  return (
    <Card style={{marginBottom:"30px"}}>
            <Card.Body style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{width:"50%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span className={`${style.item}`}>{habit.name}</span>
                {habit.type === "positive" ? <div className={style.item}><input style={{width:"30px",height:"30px",margin:"0px"}} className={`form-check-input`} type="checkbox" id="flexCheckDefault"/></div>:<button style={{color:"#D50000",border:"none",backgroundColor: "inherit"}} className={`${style.item} ${style.horizontal}`}><FontAwesomeIcon icon={faRefresh}/><span style={{marginLeft:"5px"}}>RESET</span></button>}
                <div className={style.info}>
                    <div className={`${style.item} ${style.vertical}`}>
                        <label style={{fontWeight:"600",display:"block"}}>Streak</label>
                        <span>{habit.streak.toString()}</span>
                    </div>
                    <div className={`${style.item} ${style.vertical}`}>
                        <label style={{fontWeight:"600",display:"block"}}>Goal</label>
                        <span>{habit.goal.toString()}</span>
                    </div>
                    <div className={`${style.item} ${style.vertical}`}>
                        <label style={{fontWeight:"600",display:"block"}}>Estimated End Date</label>
                        <span>{habit.estimationDate}</span>
                    </div>
                </div>
              </div>
              {habit.type == "positive" ? <span className={`${style.item} ${style.positive}`}>POSITIVE</span>:<span className={`${style.item} ${style.negative}`}>NEGATIVE</span>}
              <div style={{"width":"200px",display:"flex",justifyContent:"space-evenly"}}>
                <button style={{border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon style={{width:"20px","height":"20px",color:"#007BFF"}} icon={faEdit}></FontAwesomeIcon></button>
                <button style={{border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon style={{width:"20px","height":"20px",color:"#FF0000"}} icon={faTrash}></FontAwesomeIcon></button>
              </div>
            </Card.Body>
    </Card>
  )
}

export default HabitCard