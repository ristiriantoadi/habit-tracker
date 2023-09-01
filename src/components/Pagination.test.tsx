import { getSubsetData } from "./Pagination"

describe('pagination',()=>{
    test("if data is empty list, getSubsetData return empty list",()=>{
        let data:any[]=[]
        data = getSubsetData(1,data,10)
        expect(data).toHaveLength(0)
    })

    test("if data's length is 5, pageSize is 5, getSubsetData should return everything",()=>{
        let data:any[]=[1,2,3,4,5]
        let subsetData = getSubsetData(1,data,5)
        expect(data).toEqual(subsetData)
    })

    test("if data's length is 5, pageSize is n, page is 1, getSubsetData should return the first n elements",()=>{
        let data:any[]=[1,2,3,4,5]
        const n = 2
        let subsetData = getSubsetData(1,data,n)
        expect(subsetData).toEqual(data.slice(0,n))
    })
})  

export { }
