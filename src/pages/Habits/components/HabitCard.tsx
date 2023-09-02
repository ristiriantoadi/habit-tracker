import { faCheck, faEdit, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { HabitDisplay, HabitProp } from '../../../models/HabitModel'
import { addDate, areDatesConsecutive, convertDateObjectToYearMonthDate, getDaysBetweenTwoDates } from '../../../util/util_date'
import style from "./HabitCard.module.css"

interface Props{
    habitProp:HabitProp,
    currentDate:Date,
    resetStreak:Function
    index:number
}

export const getCurrentStreakNegativeHabit = (resetHistories:Date[],startDate:Date,currentDate:Date)=>{
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

export const convertHabitPropToHabitDisplay = (habit:HabitProp,currentDate:Date)=>{
    const currentStreak = habit.habitType == "positive" ? 
        getCurrentStreakPositiveHabit(
            habit.doneHistories,
            new Date(convertDateObjectToYearMonthDate(currentDate))) : 
        getCurrentStreakNegativeHabit(
            habit.resetHistories,
            new Date(convertDateObjectToYearMonthDate(habit.createTime)),
            new Date(convertDateObjectToYearMonthDate(currentDate)))
    
    const convertedHabit:HabitDisplay = {
        id:habit.id,
        name:habit.name,
        goal:habit.goal,
        habitType:habit.habitType,
        streak:currentStreak,
        startDate:habit.createTime,
        estimatedDate:addDate(new Date(),(habit.goal-currentStreak))

    }
    return convertedHabit
}

function HabitCard({habitProp,currentDate,resetStreak,index}:Props) {
    const [loading,setLoading] = useState(false)
    const habitDisplay = convertHabitPropToHabitDisplay(habitProp,currentDate)
    const handleReset = async ()=>{
        if (habitDisplay.streak == 0) return
        setLoading(true)
        await resetStreak(index)
        setLoading(false)
    }

    const checkIcon = ()=>{
        return <FontAwesomeIcon data-testid="check-icon" style={{"width":"30px",height:"30px",color:"green"}} icon={faCheck}></FontAwesomeIcon>
    }

    const getButtonReset = ()=>{
        if (habitDisplay.streak < habitDisplay.goal){
            return <button onClick={handleReset} data-testid="button-reset" 
            style={{color:"#D50000",border:"none",backgroundColor: "inherit"}}>
                <FontAwesomeIcon style={{"width":"30px",height:"30px"}} icon={faRefresh}/>
        </button>
        }else return checkIcon();
    }
    const getCheckBox = ()=>{
        if (habitDisplay.streak < habitDisplay.goal){ 
            return <input style={{width:"30px",height:"30px",marginRight:"10px"}} 
            className={`form-check-input`} type="checkbox" data-testid="checkbox"/>
        }else return checkIcon()
    }

    return (
        <div>
            <Card className={`${style.small} ${style.card}`}>
                {loading === true && <div className='loader'></div>}
                <Card.Body style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                    {habitDisplay.habitType === "positive" ?
                        getCheckBox():getButtonReset()
                    }
                    <div style={{width:"70%"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:"30px"}}>
                            <span style={{marginRight:"15px",width:"300px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>{habitDisplay.name}</span>
                            {habitDisplay.habitType === "positive"? <span className={style.positive}>Positive Habit</span>:<span className={style.negative}>Negative Habit</span>} 
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px"}}>
                            <div style={{display:"flex",flexFlow:"column"}}>
                                <label style={{fontWeight:"600"}}>Streak</label>
                                <span>{habitDisplay.streak.toString()}</span>
                            </div>
                            <div style={{display:"flex",flexFlow:"column"}}>
                                <label style={{fontWeight:"600"}}>Goal</label>
                                <span>{habitDisplay.goal.toString()}</span>
                            </div>
                            <div style={{display:"flex",flexFlow:"column"}}>
                                <label style={{fontWeight:"600"}}>Estimation Date</label>
                                <span>{habitDisplay.estimatedDate.toDateString()}</span>
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
                {loading === true && <div className='loader'></div>}
                <Card.Body style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        {habitDisplay.habitType === "positive" ? getCheckBox():getButtonReset()}    
                        <span style={{marginLeft:"20px",width:"150px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>{habitDisplay.name}</span>
                        <div className={style.itemInfo}>
                            <label className={style.itemInfoLabel}>Streak</label>
                            <span data-testid="streak">{habitDisplay.streak.toString()}</span>
                        </div>
                        <div className={style.itemInfo}>
                            <label className={style.itemInfoLabel}>Goal</label>
                            <span>{habitDisplay.goal.toString()}</span>
                        </div>
                        <div className={style.itemInfo}>
                                <label className={style.itemInfoLabel}>Start Date</label>
                                <span>{habitDisplay.startDate.toDateString()}</span>
                        </div>
                        <div className={style.itemInfo}>
                            <label className={style.itemInfoLabel}>Estimation Date</label>
                            <span>{habitDisplay.estimatedDate.toDateString()}</span>
                        </div>
                        {habitDisplay.habitType === "positive"? <span className={style.positive} style={{marginLeft:"60px",width:"150px"}}>Positive Habit</span>:<span className={style.negative} style={{marginLeft:"60px",width:"150px"}}>Negative Habit</span>}
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

export default HabitCard
