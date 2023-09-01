export const getFutureDateFromToday = (n:number)=>{
    const futureDate = new Date()
    futureDate.setDate(new Date().getDate() + n);
    return futureDate
}