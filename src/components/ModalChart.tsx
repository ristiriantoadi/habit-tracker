import { Button, Modal } from 'react-bootstrap'
import { HabitDB } from '../models/HabitModel'

interface Prop{
    show:boolean
    handleClose:Function
    habit?:HabitDB|null
}

function ModalChart({show,handleClose,habit}:Prop) {
    console.log("habit",habit)
  return (
    <Modal show={show} onHide={()=>handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{habit?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalChart