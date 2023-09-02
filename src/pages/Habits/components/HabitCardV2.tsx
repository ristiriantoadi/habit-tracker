import { faEdit, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Timestamp } from 'firebase/firestore'
import { Card } from 'react-bootstrap'
import { HabitReceived } from '../../../models/Habit'
import { addDate, areDatesConsecutive, getDaysBetweenTwoDates } from '../../../util/util_date'
import style from "./HabitCardV2.module.css"

interface Props{
    habit:HabitReceived
}

interface Habit{
    id:string
    name:string
    goal:number
    habitType:string
    estimatedDate:Date
    streak:number
}

export const getCurrentStreakNegativeHabit = (resetHistories:Date[],startDate:Date,currentDate:Date)=>{
    console.log("startDate",startDate)
    console.log("currentDate",currentDate)
    if (resetHistories.length == 0) return Math.abs(getDaysBetweenTwoDates(startDate,currentDate))

    const lastReset = resetHistories[resetHistories.length-1]
    return Math.abs(getDaysBetweenTwoDates(lastReset,currentDate))
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

export const convertHabitReceivedToHabit = (habit:HabitReceived)=>{
    const today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    const startDate = `${(habit.createTime as Timestamp).toDate().getFullYear()}-${(habit.createTime as Timestamp).toDate().getMonth()}-${(habit.createTime as Timestamp).toDate().getDate()}`
    const streak = habit.habitType == "positive" ? getCurrentStreakPositiveHabit(habit.doneHistories,new Date()) : getCurrentStreakNegativeHabit(habit.resetHistories,new Date(startDate),new Date(today))
    const convertedHabit:Habit = {
        id:habit.id,
        name:habit.name,
        goal:habit.goal,
        habitType:habit.habitType,
        streak:streak,
        estimatedDate:addDate(new Date(),(habit.goal-streak))

    }
    return convertedHabit
}

function HabitCardV2({habit: habitReceived}:Props) {
    const habit = convertHabitReceivedToHabit(habitReceived)
    return (
        <div key={habit.id}>
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
                                <span>{habit.streak.toString()}</span>
                            </div>
                            <div style={{display:"flex",flexFlow:"column"}}>
                                <label style={{fontWeight:"600"}}>Goal</label>
                                <span>{habit.goal.toString()}</span>
                            </div>
                            <div style={{display:"flex",flexFlow:"column"}}>
                                <label style={{fontWeight:"600"}}>Estimation Date</label>
                                <span>{habit.estimatedDate.toDateString()}</span>
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
                            <span>{habit.streak.toString()}</span>
                        </div>
                        <div style={{display:"flex", marginLeft:"20px",width:"150px",flexFlow:"column"}}>
                            <label style={{fontWeight:"600"}}>Goal</label>
                            <span>{habit.goal.toString()}</span>
                        </div>
                        <div style={{display:"flex", marginLeft:"20px",width:"150px",flexFlow:"column"}}>
                            <label style={{fontWeight:"600"}}>Estimation Date</label>
                            <span>{habit.estimatedDate.toDateString()}</span>
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
