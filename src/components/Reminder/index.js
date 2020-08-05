import React, {useState} from 'react';
import {connect} from 'react-redux';

import * as actions from '../store/actions.js';
import {IoIosAdd, IoIosClose, IoIosCheckmark, IoIosBookmark, IoIosTrash} from 'react-icons/io';
import { SketchPicker } from 'react-color';
import './styles.css';

import Weather from '../Weather';

function Reminder({date, data, dispatch}) {
    
    const TEXTINIT= "Max 30 characteres";
    const [newTextReminder, setNewTextReminder] = useState(false);
    const [textReminder, setTextReminder] = useState("");
    const [time, setTime] = useState("");
    const [timeEdit, setTimeEdit] = useState(null);
    const [city, setCity] = useState("");
    const [enableColor, setEnableColor] = useState(false);
    const [color, setColor] = useState("#000");
    
    function handleChange(color, event){
        setColor(color.hex);
    }

    function addNewReminder(){
         
        if(!validate()) return;
      
        if(!timeEdit)
            dispatch(actions.addNewReminder(date, time, city, color, textReminder));
        else
            dispatch(actions.editReminder(date, time, timeEdit, city, color, textReminder));
    }

    function validate(){
        if(time.match("^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$")==null){
            alert("Invalid Hour");
            return false;
        }
        else if(city.match("^[a-zA-Z ]{3,}$")==null){
            alert("Invalid City");
            return false;
        }
        else return true;
    }

    function newReminderInputs(){
        setTime(""); 
        setTimeEdit(null); 
        setCity("");
        setColor("#000");
        setTextReminder("");
        setNewTextReminder(true);
    }

    function setEditRemind(reminder){ 
        setTime(reminder.time); 
        setTimeEdit(reminder.time); 
        setCity(reminder.city);
        setColor(reminder.color);
        setTextReminder(reminder.text);
        setNewTextReminder(true);
    }

    function deleteReminder(reminder){ 
        dispatch(actions.deleteReminder(reminder));
    }
    
    return(
        <div className="container">
            <button className="btnClose" onClick={()=>dispatch(actions.actionsShowReminder(null))}><IoIosClose size={36}/></button>
            {newTextReminder ? 
            <div className="divReminderData" >

                <input className="input" placeholder="Time" onChange={(e)=>setTime(e.target.value)} value={time}/>
                <input className="input" placeholder="City" onChange={(e)=>setCity(e.target.value)} value={city}/>
                <textarea placeholder={TEXTINIT} maxLength={30} onChange={(e)=>setTextReminder(e.target.value)} value={textReminder}/>

                {enableColor ? <div onClick={()=>setEnableColor(false)}><SketchPicker width={80} color={color} onChange={handleChange} 
                    presetColors={[]} disableAlpha={true}/></div>
                : <div className="containerColor">Color
                    <button className="buttonColor" 
                    style={{background:color}} onClick={()=>setEnableColor(true)}></button>
                  </div>}

                <div>
                    <button onClick={()=>setNewTextReminder(false)}><IoIosClose size={48}/></button>
                    <button onClick={()=>addNewReminder()}><IoIosCheckmark size={48}/></button>
                </div>

            </div>
            : <div className="reminders">
                    <button className="btnNew" onClick={()=>newReminderInputs()}><IoIosAdd size={36}/> New Reminder</button>
                    
                    {data.reminders.map((reminder, index)=>{ 
                        if(reminder.date.year===date.year && reminder.date.month===date.month && reminder.date.day===date.day)
                            return <div key={index} className="remind">
                                        <button className="btnRemind" key={index} style={{color:reminder.color}}
                                        onClick={(e)=>setEditRemind(reminder)}>{reminder.time}
                                        <IoIosBookmark color={reminder.color} />
                                        </button>
                                        <div>
                                            
                                            <Weather city={reminder.city} date={reminder.date}/>
                                            <button onClick={()=>deleteReminder(reminder)}><IoIosTrash /></button>
                                        </div>
                                        
                                        
                                   </div>
                        else return null;
                        }) 
                    }
              </div>}
        </div>
    )
}

export default connect(state=> ({data: state}))(Reminder);