import React from 'react';

import {connect} from 'react-redux';
import * as actions from '../store/actions.js';
import {IoIosBookmark} from 'react-icons/io';

import './styles.css';

const Days = ({date, indexColumn, indexRow, weeks, data, dispatch}) =>{ 

    const classOut = (indexColumn===0 && date.day>6) || (indexColumn=== weeks-1 && date.day<25) ? "colorOut": false; 

  return( 
      <button className={"squareDay ir"+indexRow+ " "+classOut} onClick={()=>dispatch(actions.actionsShowReminder(date))}>
          
            <div className="number">{date.day}</div>
            {data.reminders.map((reminder, index)=>{
              if(reminder.date.year===date.year && reminder.date.month===date.month && reminder.date.day===date.day)
                return <IoIosBookmark key={index} color={reminder.color} className="iconReminder"/>
              else return null;
            }) }
      </button>
  )
}


export default connect(state=> ({data: state}))(Days);