import { Chart, registerables } from "chart.js";
import { Timestamp } from "firebase/firestore";
import { Button, Modal } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { HabitChart, HabitDB } from '../models/HabitModel';
import { convertDateObjectToYearMonthDate, getCurrentDate } from "../util/util_date";
import { getDataChartNegativeHabit, getDataChartPositiveHabit } from "../util/util_habit";
import style from "./ModalChart.module.css";
Chart.register(...registerables)

interface Prop{
    show:boolean
    handleClose:Function
    habit:HabitDB
}

function ModalChart({show,handleClose,habit}:Prop) {

    const getChartData = ()=>{
      let chartData:HabitChart[]=[]
      if (habit.habitType == "negative"){
        chartData = getDataChartNegativeHabit(getCurrentDate(),habit.resetHistories.map(h=>new Date(convertDateObjectToYearMonthDate((h as Timestamp).toDate()))),new Date(convertDateObjectToYearMonthDate((habit.createTime as Timestamp).toDate())))
      }else{
        chartData = getDataChartPositiveHabit(getCurrentDate(),habit.doneHistories.map(h=>new Date(convertDateObjectToYearMonthDate((h as Timestamp).toDate()))),new Date(convertDateObjectToYearMonthDate((habit.createTime as Timestamp).toDate())))
      }
      return chartData
    }

    const getLabels = ()=>{
      return getChartData().map(d=>convertDateObjectToYearMonthDate(d.currentDate))  
    }

    const getWidth = ()=>{
        let width = 1200;
        if (getLabels().length > 7) {
            width = width + (getLabels().length - 7) * 100;
        }
        return width
    }
    
    let labels = getLabels()
    const data = {
        labels,
        datasets: [
          {
            data: getChartData().map(d=>d.count),
            borderColor: "#FF0000",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
    const options = {
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
            ticks: {
                precision: 0
            }
        }
    }
  }

  return (
    <Modal dialogClassName={style.modal} show={show} onHide={()=>handleClose()}>
    {/* <Modal size="lg" show={show} onHide={()=>handleClose()}> */}
        <Modal.Header closeButton>
          <Modal.Title>{habit?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{margin: "0 auto", overflowX: "scroll" }}>
                <div style={{ width: getWidth(),height:"500px",margin:"0 auto"}}>
                    <Line
                    data={data}
                    options={options}
                    ></Line>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalChart