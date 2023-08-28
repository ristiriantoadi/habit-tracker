import { Pagination } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props{
    length:number
    size:number

}

export const getSubsetData = (currentPage:number,pageSize:number,data:any[])=>{
  const offset = (currentPage-1)*pageSize
  return data.slice(offset,offset+pageSize)
}

function PaginationComponent({length,size}:Props) {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const getNumberItems = ()=>{
      const items=[]
      for (let number = 1; number <= Math.ceil(length/size); number++) {      
        items.push(<Pagination.Item onClick={()=>{
          navigate(`?page=${number}`)}
        } key={number} active={number.toString() === (searchParams.get('page') || "1")}>
            {number}
        </Pagination.Item>)
      }
      return items
    }

    
    return (
        <Pagination size="lg">{getNumberItems()}</Pagination>
    )
}

export default PaginationComponent