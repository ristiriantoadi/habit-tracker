const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

export const getFutureDateFromToday = (n:number)=>{
    const futureDate = new Date()
    futureDate.setDate(new Date().getDate() + n);
    return futureDate
}

export const getDaysBetweenTwoDates = (date1:Date,date2:Date)=>{
    const diff = (date1.getTime()-date2.getTime())/(1000 * 60 * 60 * 24)
    const diffInt = Math.floor(Math.abs((date1.getTime()-date2.getTime())/(1000 * 60 * 60 * 24)))
    return diffInt
}

export const areDatesConsecutive = (date1:Date,date2:Date)=>{
    return (Math.abs((getDaysBetweenTwoDates(date1,date2))) === 1)
}

export const subtractDate = (date:Date,days:number)=>{
    return new Date(date.getTime()-(ONE_DAY_IN_MILLISECONDS)*(days))
}

export const addDate = (date:Date,days:number)=>{
    return new Date(date.getTime()+(ONE_DAY_IN_MILLISECONDS)*(days))
}

export const convertDateObjectToYearMonthDate = (date:Date)=>{
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}