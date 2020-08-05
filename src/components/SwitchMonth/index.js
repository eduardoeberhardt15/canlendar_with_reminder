import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions.js';

import './styles.css';
import {literalMonth} from '../Calendar/constants';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const  SwitchMonth = ({data, switchDate}) =>{

    const year = data.year;
    const month = data.month;


    return( 
    <div className="swift">
        <button className="btn" onClick={()=>switchDate(-1)}><IoIosArrowBack size={20} /></button>
        <h3>{year}/{literalMonth[month]}</h3>
        <button className="btn" onClick={()=>switchDate(1)}><IoIosArrowForward size={20} /></button>
    </div>
    );
}

const mapStateToProps = state =>({
    data: state
});

const mapDispatchToProps = dispatch =>({
    switchDate: (direction) => dispatch(actions.actionSwitchMonth(direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(SwitchMonth);
