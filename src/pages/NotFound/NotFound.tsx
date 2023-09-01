import { useEffect } from "react"
import { useNavigate } from "react-router"

function NotFound() {

    const navigate = useNavigate()

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            navigate("/")
        },3000)
        return () => {
            clearTimeout(timeout); // Clear the timeout if the component unmounts before 3 seconds
          };
    },[navigate])

    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
            <h3>404 Page Not Found</h3>
        </div>
    )
}

export default NotFound