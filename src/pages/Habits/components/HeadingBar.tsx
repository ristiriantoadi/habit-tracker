import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import style from "./HeadingBar.module.css"

function HeadingBar() {
  const navigate = useNavigate()
  return (
    <div className={style.container}>
        <Button onClick={()=>navigate("create")}><FontAwesomeIcon icon={faPlus}/><span className={style.textButton}>Create Habit</span></Button>
        <div style={{"position":"relative"}}>
            <Form.Control className={style.searchBar} type="text" placeholder="Search"/>
            <FontAwesomeIcon className={style.icon} icon={faSearch} />
        </div>
    </div>
  )
}

export default HeadingBar
