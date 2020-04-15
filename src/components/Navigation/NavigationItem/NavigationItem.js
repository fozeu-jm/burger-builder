import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const NavigationItems = (props) => { return(
    <ul className={classes.NavigationItems}>
        <li className="NavigationItem">
            <NavLink exact to="/">Home</NavLink>
        </li>
        {props.isAuth? <li className="NavigationItem"><NavLink to="/orders">Orders</NavLink></li> : null}

        { !props.isAuth ? <li className="NavigationItem"><NavLink to="/auth">Connect</NavLink></li> 
        : <li className="NavigationItem"><NavLink to="/logout">Logout</NavLink></li> }
    </ul>
) };

export default NavigationItems;