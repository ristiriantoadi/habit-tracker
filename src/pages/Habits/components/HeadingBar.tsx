import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import style from "./HeadingBar.module.css"

interface Props{
  filterData:Function
}

function HeadingBar({filterData}:Props) {
  const navigate = useNavigate()
  const [search,setSearch] = useState("")

  useEffect(()=>{
    filterData(search)
  },[search])
  return (
    <div className={style.container}>
        <Button onClick={()=>navigate("create")}><FontAwesomeIcon icon={faPlus}/><span className={style.textButton}>Create Habit</span></Button>
        <div style={{"position":"relative"}}>
            <Form.Control className={style.searchBar} type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search"/>
            <FontAwesomeIcon className={style.icon} icon={faSearch} />
        </div>
    </div>
  )
}

export default HeadingBar
