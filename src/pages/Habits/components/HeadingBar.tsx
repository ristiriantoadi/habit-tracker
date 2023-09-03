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
  const [showDone,setShowDone] = useState(false)
  const [showUndone,setShowUndone] = useState(false)

  const handleShowDone = (e:any)=>{
    setShowDone(e.target.checked)
  }

  const handleShowUndone = (e:any)=>{
    setShowUndone(e.target.checked)
  }

  useEffect(()=>{
    console.log("show done",showDone)
    console.log("show undone",showUndone)
    if (showDone == true && showUndone == true){
      filterData(search)
    }
    else if(showDone==false && showUndone == false){
      filterData(search)
    }
    else if (showDone == true){
      filterData(search,true)
    }else{
      filterData(search,false)
    }
  },[search,showDone,showUndone])
  return (
    <div className={style.container}>
        <Button onClick={()=>navigate("create")}><FontAwesomeIcon icon={faPlus}/><span className={style.textButton}>Create Habit</span></Button>
        <div style={{"position":"relative"}}>
            <Form.Control className={style.searchBar} type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search"/>
            <FontAwesomeIcon className={style.icon} icon={faSearch} />
        </div>
        <div className={style.inputCheckbox}>
          <input type="checkbox" onChange={handleShowDone}  className={`form-check-input`}/><span style={{"marginLeft":"5px"}}>Show Finished</span>
        </div>
        <div className={style.inputCheckbox}>
          <input type="checkbox" onChange={handleShowUndone} className={`form-check-input`}/><span style={{"marginLeft":"5px"}}>Show Unfinished</span>
        </div>
    </div>
  )
}

export default HeadingBar
