import { ReactNode } from "react"
import { Button } from "react-bootstrap"

interface Props{
    loading:boolean
    children:ReactNode
}


function ButtonSubmit({loading,children}:Props) {
  return (
    <div>
        <Button type="submit">{loading == false? children:<div className="loader"></div>}</Button>
    </div>
  )
}

export default ButtonSubmit