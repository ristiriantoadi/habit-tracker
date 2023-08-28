import { ReactNode } from "react"
import { Button } from "react-bootstrap"

interface Props{
    loading:boolean
    children:ReactNode
}


function ButtonSubmit({loading,children}:Props) {
  return (
    <div>
        {loading === false? <Button type="submit">{children}</Button>:<Button type="submit"><div className="loader"></div></Button>}
    </div>
  )
}

export default ButtonSubmit