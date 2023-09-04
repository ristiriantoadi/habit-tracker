import { Alert } from 'react-bootstrap'
import style from "./Alert.module.css"

interface Prop{
    show:boolean
}

function AlertError({show}:Prop) {
  return (
    <div className={style.alert}>
        {show && <Alert variant="danger">
            Login Failed
        </Alert>}
    </div>
  )
}

export default AlertError