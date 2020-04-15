import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import { Link } from 'react-router-dom';
const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'}
]
const buildControls = (props) => { 
    let Zerocounter=0;
    Object.entries(props.ingredients).map((ing)=>{
        if(ing[1] === 0){
            return [];
        }else{
            Zerocounter++;
            return ing;
        }
    });
    return(
        <div className={classes.BuildControls}>
            <p className="totalPrice">Total Price: {props.total.toFixed(2)} € </p>
            {controls.map((ctrl)=>{
                return <BuildControl key={ctrl.label} label={ctrl.label}
                added={props.ingredientAdded} remove={props.ingredientRemoved}
                ings = {props.ingredients}
                 unitPrice={props.prices[ctrl.type]} type={ctrl.type}/>
            })}
            {props.isAuth? <button onClick={props.purchasing} disabled={Zerocounter===0} className={classes.OrderButton}>ORDER NOW</button> :
            <Link to="/auth" className={classes.OrderButton}>SIGN UP TO ORDER</Link>}
        </div>
    ) };
export default buildControls;