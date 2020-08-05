export function actionSwitchMonth(direction){
    return{
        type: "SWITCH_MONTH",
        direction
    }
}

export function actionsShowReminder(date){
    return{
        type: "SHOW_REMINDER",
        date
    }
}

export function addNewReminder(date, time, city, color, text){
    
    return{
        type: "ADD_NEW_REMINDER",
        date,
        time, 
        city,
        color,
        text
    }
}

export function editReminder(date, time, timeEdit, city, color, text){
    
    return{
        type: "EDIT_REMINDER",
        date,
        time, 
        timeEdit,
        city,
        color,
        text
    }
}

export function deleteReminder(reminder){
    
    return{
        type: "DELETE_REMINDER",
        reminder
    }
}