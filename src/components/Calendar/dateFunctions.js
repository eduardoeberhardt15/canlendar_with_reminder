function getFirstDay(month, year) {

    const date = new Date(year, month);
    date.setDate(1);
    return date.getDay();
}


function getDaysInMonth(month, year){  

    return new Date(year, month + 1, 0).getDate(); 
}

function getWeekOfMonth(firstDay, totalDays){
    
    return Math.ceil((firstDay + totalDays) / 7);
}

export function createCalendarDays(month, year){

    const firstDay = getFirstDay(month, year); 
    const totalDays = getDaysInMonth(month, year);
    let day, totalDaysLastMonth = getDaysInMonth(month-1, year);
    const totalWeeks = getWeekOfMonth(firstDay, totalDays);
    const rows=[];
    const lastMonth = month===0 ? 11 : month-1;
    const nextMonth = month===11 ? 0 : month+1;
    const lastYear = month===0 ? year-1 : year;
    const nextYear = month===11 ? year+1 : year;

    for(let i=0; i<totalWeeks; i++){

        const columns=[];
        if(i===0){
            for(let j=firstDay-1, k=0; j>=0; j--, k++){
                columns[j]={
                    day:totalDaysLastMonth-k,
                    month: lastMonth,
                    year: lastYear
                };
            }
            for(let j=firstDay, k=1; j<7; j++, k++){
                columns[j]={
                    day:k,
                    month,
                    year
                };
                day=k+1;
            }
        }
        else{
            for(let j=0; j<7 && day<=totalDays; j++, day++){
                columns[j]={
                    day,
                    month,
                    year
                };
                if(day===totalDays){
                     
                    for(let l=j+1, k=1; l<7; l++, k++){
                        columns[l]={
                            day:k,
                            month:nextMonth,
                            year:nextYear
                        };
                    } 
                }
                
            }
            
        }
       rows.push(columns); 
       

    }

    return {rows, totalWeeks};
}