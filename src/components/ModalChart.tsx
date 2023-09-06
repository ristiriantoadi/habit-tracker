import { Chart, registerables } from "chart.js";
import { Button, Modal } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { HabitDB } from '../models/HabitModel';
import style from "./ModalChart.module.css";
Chart.register(...registerables)

interface Prop{
    show:boolean
    handleClose:Function
    habit?:HabitDB|null
}

function ModalChart({show,handleClose,habit}:Prop) {

    let labels = ["2023-01-01","2023-01-02","2023-01-03","2023-01-04","2023-01-05","2023-01-06","2023-01-07","2023-01-08","2023-01-09",]

    const getWidth = ()=>{
        let width = 1200;
        if (labels.length > 7) {
            width = width + (labels.length - 7) * 100;
        }
        return width
    }

    const data = {
        labels,
        datasets: [
          {
            data: [1,2,3,4,5,6,7,8,9],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

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
                    options={{
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                    }}
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