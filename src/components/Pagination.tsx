import { Pagination } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props{
    length:number
    size?:number

}

export const pageSize=2

function PaginationComponent({length,size}:Props) {

    const items=[]
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    if (size === undefined){
      size = pageSize 
    }


    for (let number = 1; number <= Math.ceil(length/size); number++) {      
      items.push(<Pagination.Item onClick={()=>{
        navigate(`/habits?page=${number}`)}   
      } key={number} active={number.toString() === (searchParams.get('page') || "1")}>
          {number}
      </Pagination.Item>)
    }
    
    return (
        <Pagination size="lg">{items}</Pagination>
    )
}

export default PaginationComponent