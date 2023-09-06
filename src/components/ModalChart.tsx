import { Button, Modal } from 'react-bootstrap'

interface Prop{
    show:boolean
    handleClose:Function
    
}

function ModalChart({show,handleClose}:Prop) {
  return (
    <Modal show={show} onHide={()=>handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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