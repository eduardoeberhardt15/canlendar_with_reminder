import React from 'react';

import {connect} from 'react-redux';

import './styles.css';
import Days from '../Days';
import SwitchMonth from '../SwitchMonth';
import Reminder from '../Reminder';
import {createCalendarDays} from './dateFunctions.js';

const Calendar = ({data}) => { 
    
    const year = data.year;
    const month = data.month;

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const calendarDays=createCalendarDays(month, year);
    const rows = calendarDays.rows;
    const totalWeeks = calendarDays.totalWeeks;

    return (
        
        <div className="table">
            <SwitchMonth year={year} month={month}/>   
            <div className="header">
            {
                weekDays.map((weekDay, index) =>(
                    <div className="classWeekDay" key={index}>
                        {weekDay}
                    </div>
                ))
            }    
            </div>
            
            {data.dateReminder? <Reminder date={data.dateReminder}/> : null}

            { 
                rows.map((row, indexColumn)=>{
                    
                return( 
                        
                    <div className="row" key={indexColumn}>
                        {row.map((obj, indexRow) => {

                            const date = {
                                year:obj.year,
                                month:obj.month,
                                day:obj.day
                            }
                            return(
                            <Days key={indexRow} 
                            date={date} 
                            indexColumn={indexColumn} 
                            indexRow={indexRow} 
                            weeks={totalWeeks}/>)
                        })}
                    </div> 
                    
                    
                )})  
            }
        </div>
    
    );
}

export default connect(state=> ({data: state}))(Calendar);