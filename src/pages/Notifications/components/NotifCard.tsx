import { Card } from 'react-bootstrap'
import { NotificationModel } from '../../../models/NotifModel'


interface Props{
    notif:NotificationModel
}

function NotifCard({notif}:Props) {
  return (
    <Card style={{marginTop:"20px"}}>
            <Card.Body>
                <p style={{color:"#888888"}}>{notif.createTime.toDate().toLocaleString()}</p>
                <p>Dont forget to do <b>{notif.habitName}</b> today!</p>
            </Card.Body>
        </Card>
  )
}

export default NotifCard