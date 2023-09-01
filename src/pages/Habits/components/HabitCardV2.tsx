import { faEdit, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'react-bootstrap'
import { HabitReceived } from '../../../models/Habit'
import style from "./HabitCardV2.module.css"

interface Props{
    habit:HabitReceived
}

const getDaysBetweenTwoDates = (date1:Date,date2:Date)=>{
    return (date1.getTime()-date2.getTime())/(1000 * 60 * 60 * 24)
}

const areDatesConsecutive = (date1:Date,date2:Date)=>{
    return (Math.abs((getDaysBetweenTwoDates(date1,date2))) === 1)
}

export const getCurrentStreakPositiveHabit = (doneHistories:Date[],currentDate:Date)=>{
    doneHistories = doneHistories;
    let currentStreak=0
    for (let i = doneHistories.length-1; i>=0; i--) {
        if (i === doneHistories.length-1){
            if (Math.abs(getDaysBetweenTwoDates(doneHistories[i],currentDate))>1) break
            currentStreak++
        }
        else if(areDatesConsecutive(doneHistories[i],doneHistories[i+1])){
            currentStreak++
        }else{
            break;
        }
      } 
    return currentStreak

}

function HabitCardV2({habit}:Props) {
    return (
        <div>
            <Card className={`${style.small} ${style.card}`}>
                <Card.Body style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                    {habit.habitType === "positive" ? <input style={{width:"30px",height:"30px",marginRight:"10px"}} className={`form-check-input`} type="checkbox"></input>:<button style={{color:"#D50000",border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon style={{width:"30px",height:"30px"}}  icon={faRefresh}/></button>}
                    <div style={{width:"70%"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:"30px"}}>
                            <span style={{marginRight:"15px",width:"300px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>{habit.name}</span>
                            {habit.habitType === "positive"? <span className={style.positive}>Positive Habit</span>:<span className={style.negative}>Negative Habit</span>} 
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px"}}>
                            <div style={{display:"flex",flexFlow:"column"}}>
                                <label style={{fontWeight:"600"}}>Streak</label>
                                <span>{"0"}</span>
                            </div>
                            <div style={{display:"flex",flexFlow:"column"}}>
                                <label style={{fontWeight:"600"}}>Goal</label>
                                <span>{habit.goal.toString()}</span>
                            </div>
                            <div style={{display:"flex",flexFlow:"column"}}>
                                <label style={{fontWeight:"600"}}>Estimation Date</label>
                                <span>{"-"}</span>
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
                    <div style={{display:"flex",alignItems:"center"}}>
                        {habit.habitType === "positive" ? <input style={{width:"30px",height:"30px",marginRight:"10px"}} className={`form-check-input`} type="checkbox"></input>:<button style={{color:"#D50000",border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon style={{"width":"30px",height:"30px"}} icon={faRefresh}/></button>}
                        <span style={{marginLeft:"20px",width:"150px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>{habit.name}</span>
                        <div style={{display:"flex", marginLeft:"20px",width:"150px",flexFlow:"column"}}>
                            <label style={{fontWeight:"600"}}>Streak</label>
                            <span>{"0"}</span>
                        </div>
                        <div style={{display:"flex", marginLeft:"20px",width:"150px",flexFlow:"column"}}>
                            <label style={{fontWeight:"600"}}>Goal</label>
                            <span>{habit.goal.toString()}</span>
                        </div>
                        <div style={{display:"flex", marginLeft:"20px",width:"150px",flexFlow:"column"}}>
                            <label style={{fontWeight:"600"}}>Estimation Date</label>
                            <span>{"-"}</span>
                        </div>
                        {habit.habitType === "positive"? <span className={style.positive} style={{marginLeft:"60px",width:"150px"}}>Positive Habit</span>:<span className={style.negative} style={{marginLeft:"60px",width:"150px"}}>Negative Habit</span>}
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