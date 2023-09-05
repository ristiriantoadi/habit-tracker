import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DEFAULT_PAGE_SIZE = 1

interface Props{
    currentPage:string,
    length:number
    pageSize?:number

}

export const getSubsetData = (currentPage:number,data:any[],pageSize:number=DEFAULT_PAGE_SIZE)=>{
  const offset = (currentPage-1)*pageSize
  return data.slice(offset,offset+pageSize)
}

function PaginationComponent({currentPage,length,pageSize=DEFAULT_PAGE_SIZE}:Props) {

    const navigate = useNavigate()
    const getNumberItems = ()=>{
      const items=[]
      for (let number = 1; number <= Math.ceil(length/pageSize); number++) {      
        items.push(<Pagination.Item onClick={()=>{
          navigate(`?page=${number}`)}
        } key={number} active={number.toString() === currentPage}>
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