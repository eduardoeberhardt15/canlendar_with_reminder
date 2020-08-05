import {createStore} from 'redux';

const INITIAL_STATE={

    year:new Date().getFullYear(),
    month: new Date().getMonth(),
    reminders:[]
};

function reducer(state= INITIAL_STATE, action){
    
    state.dateReminder=null;
    
    if(action.type ==="SWITCH_MONTH"){

        const date = new Date(state.year, state.month);

        if(action.direction>0)
            date.setMonth(state.month+1);
        else
            date.setMonth(state.month-1);
        
        return {
            ...state, year:date.getFullYear(), month:date.getMonth()
        }
    }

    if(action.type==="SHOW_REMINDER"){

        return{
            ...state, dateReminder:action.date
        }

    }

    if(action.type==="ADD_NEW_REMINDER"){
        
        const newState = {
            ...state, reminders:[...state.reminders, {
                date:action.date,
                time:action.time,
                city:action.city,
                color: action.color,
                text:action.text
            }]
        }
        newState.reminders.sort((a,b)=>{
            if(a.time < b.time)
                return -1;
                else return 1;
        });
           
        return newState;

    }

    if(action.type==="EDIT_REMINDER"){
        
        state.reminders.forEach(reminder=>{
            
            if(reminder.time===action.timeEdit){
                
                reminder.time=action.time;
                reminder.city=action.city;
                reminder.color= action.color;
                reminder.text=action.text;
            }
        });

        state.reminders.sort((a,b)=>{
            if(a.time < b.time)
                return -1;
                else return 1;
        });

        return{
            ...state
        }
        
    }

    if(action.type==="DELETE_REMINDER"){
        
        state.reminders.forEach((reminder, index)=>{
            
            if(reminder.time===action.reminder.time && 
                reminder.date.year===action.reminder.date.year && 
                reminder.date.month===action.reminder.date.month && 
                reminder.date.day===action.reminder.date.day){
                
                    state.reminders.splice(index, 1);
            }
        });

        return{
            ...state
        }
        
    }

    return state;
}
const store = createStore(reducer);

export default store;