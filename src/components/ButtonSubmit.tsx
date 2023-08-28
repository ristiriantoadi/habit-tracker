import { Button } from "react-bootstrap"

interface Props{
    loading:boolean
    text:String
}


function ButtonSubmit({loading,text}:Props) {
  return (
    <div>
        {loading === false? <Button type="submit">{text}</Button>:<Button type="submit"><div className="loader"></div></Button>}
    </div>
  )
}

export default ButtonSubmit