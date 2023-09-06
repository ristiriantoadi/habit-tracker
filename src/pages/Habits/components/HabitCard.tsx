import { faCheck, faEdit, faLineChart, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { HabitProp } from '../../../models/HabitModel'
import { getDaysBetweenTwoDates } from '../../../util/util_date'
import style from "./HabitCard.module.css"

interface Props{
    habitProp:HabitProp,
    currentDate:Date,
    resetStreak:Function
    index:number
    doHabit:Function
    deleteHabit:Function
}

function HabitCard({habitProp,currentDate,resetStreak,doHabit,deleteHabit}:Props) {

    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    
    const handleReset = async ()=>{
        if (habitProp.streak == 0) return
        setLoading(true)
        await resetStreak(habitProp.id)
        setLoading(false)
    }
    const handleDone = async ()=>{
        setLoading(true)
        await doHabit(habitProp.id,habitProp.streak)
        setLoading(false)
    }
    const checkIcon = ()=>{
        return <FontAwesomeIcon data-testid="check-icon" style={{"width":"30px",height:"30px",color:"green",marginRight:"10px"}} icon={faCheck}></FontAwesomeIcon>
    }
    const getButtonReset = ()=>{
        return <button onClick={handleReset} data-testid="button-reset" 
            style={{color:"#D50000",border:"none",backgroundColor: "inherit"}}>
                <FontAwesomeIcon style={{"width":"30px",height:"30px"}} icon={faRefresh}/>
        </button>
    }
    const getCheckBox = ()=>{
        let checked=false
        if (habitProp.doneHistories.length > 0){
            if (getDaysBetweenTwoDates(habitProp.doneHistories[habitProp.doneHistories.length-1],currentDate) === 0){
                checked=true
            }
        }
        return <input checked={checked} disabled={checked} onChange={handleDone} style={{width:"30px",height:"30px",marginRight:"10px"}} 
            className={`form-check-input`} type="checkbox" data-testid="checkbox"/>
    }
    const getLoader = ()=>{
        return loading === true && <div style={{position:"absolute",display: "flex",justifyContent: "center",alignItems: "center",height: "100%",width:"100%",zIndex:"1",backgroundColor: "rgba(255, 255, 255, 0.8)"}}><div style={{width:"30px",height:"30px"}} className='loader'></div></div>
    }
    const getMainButton=()=>{
        if (habitProp.isDone === true) return checkIcon()
        return habitProp.habitType === "positive" ? getCheckBox():getButtonReset()
    }
    const gotoEditPage = ()=>{
        navigate("edit/"+habitProp.id)
    }
    const handleDelete = ()=>{
        Swal.fire({
            title: 'Are you sure you want to delete?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: "#f44336",
            denyButtonText: `Cancel`,
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setLoading(true)
                await deleteHabit(habitProp.id)
                setLoading(false)
            } 
          })
    }

    return (
        <div>
            <Card className={`${style.small} ${style.card}`}>
                {getLoader()}
                <Card.Body style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                    {getMainButton()}
                    <div style={{width:"70%"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:"30px"}}>
                            <span style={{marginRight:"15px",width:"300px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>{habitProp.name}</span>
                            {habitProp.habitType === "positive"? <span className={style.positive}>Positive Habit</span>:<span className={style.negative}>Negative Habit</span>} 
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px"}}>
                            <div className={style.info}>
                                <label className={style.infoLabel}>Streak</label>
                                <span>{habitProp.streak.toString()}</span>
                            </div>
                            <div className={style.info}>
                                <label className={style.infoLabel}>Goal</label>
                                <span>{habitProp.goal.toString()}</span>
                            </div>
                            <div className={style.info}>
                                <label className={style.infoLabel}>Estimation Date</label>
                                <span>{habitProp.estimatedDate.toDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{display:"flex",flexFlow:"column"}}>
                        <button onClick={gotoEditPage} data-testid="button-edit" style={{border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon className={style.icon} style={{marginBottom:"5px",color:"#FFD700"}} icon={faEdit}></FontAwesomeIcon></button>
                        <button style={{border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon style={{color:"#007BFF"}} className={style.icon} icon={faLineChart}></FontAwesomeIcon></button>
                        <button onClick={handleDelete} style={{border:"none",backgroundColor: "inherit"}}><FontAwesomeIcon className={style.icon} style={{color:"#FF0000"}} icon={faTrash}></FontAwesomeIcon></button>
                    </div>
                </Card.Body>
            </Card>
            <Card className={`${style.big} ${style.card}`}>
                {getLoader()}
                <Card.Body style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        {getMainButton()}    
                        <span style={{marginLeft:"20px",width:"150px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>{habitProp.name}</span>
                        <div className={style.itemInfo}>
                            <label className={style.infoLabel}>Streak</label>
                            <span data-testid="streak">{habitProp.streak.toString()}</span>
                        </div>
                        <div className={style.itemInfo}>
                            <label className={style.infoLabel}>Goal</label>
                            <span>{habitProp.goal.toString()}</span>
                        </div>
                        <div className={style.itemInfo}>
                                <label className={style.infoLabel}>Start Date</label>
                                <span>{habitProp.createTime.toDateString()}</span>
                        </div>
                        <div className={style.itemInfo}>
                            <label className={style.infoLabel}>Estimation Date</label>
                            <span>{habitProp.estimatedDate.toDateString()}</span>
                        </div>
                        {habitProp.habitType === "positive"? <span className={style.positive} style={{marginLeft:"60px",width:"150px"}}>Positive Habit</span>:<span className={style.negative} style={{marginLeft:"60px",width:"150px"}}>Negative Habit</span>}
                    </div>
                    <div style={{display:"flex"}}>
                        <button onClick={gotoEditPage} data-testid="button-edit" className={style.buttonRight}><FontAwesomeIcon className={style.icon} style={{color:"#FFD700"}} icon={faEdit}></FontAwesomeIcon></button>
                        <button className={style.buttonRight}><FontAwesomeIcon className={style.icon} style={{color:"#007BFF"}} icon={faLineChart}></FontAwesomeIcon></button>
                        <button onClick={handleDelete} className={style.buttonRight}><FontAwesomeIcon className={style.icon} style={{color:"#FF0000"}} icon={faTrash}></FontAwesomeIcon></button>
                    </div>
                </Card.Body>
            </Card>
        </div>

  )
}

export default HabitCard
