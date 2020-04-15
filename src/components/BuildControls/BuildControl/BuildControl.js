import React, {useRef} from 'react';
import classes from './BuildControl.module.css';
import meat from '../../../assets/meat.png';
import salad from '../../../assets/salad.png';
import bacon from '../../../assets/bacon.png';
import cheese from '../../../assets/cheese.png';
const BuildControl = (props) => { 
 let img = null;

 const ref = useRef(null);
    switch(props.type){
            case "meat":
                img= <img src={meat} alt=""/>; 
                break; 
            case "salad":
                img= <img src={salad} alt=""/>; 
                break; 
            case "bacon":
                img= <img src={bacon} alt=""/>; 
                break; 
            case "cheese":
                img= <img src={cheese} alt=""/>; 
                break; 
            default:
                img=null;
    }
    return(
        <div className={classes.BuildControl}>
            <div className={classes.ControlImageDisabled}>
                {img}
            </div>
            <div className={classes.Label}>
                {props.label} <br/>
            <span className={classes.ControlPrice}>{props.unitPrice} €</span>
            </div>
            {/* plus or minus input style */}
            <button disabled={props.ings[props.type]===0} className={classes.minus} onClick={() => props.remove(props.type)}>-</button>
            <input ref={ref} readOnly className={classes.counter} type="text" value={props.ings[props.type]}/>
            <button className={classes.plus } onClick={() => props.added(props.type)}>+</button>
        </div>
    ) 
};

export default BuildControl;