import React from 'react';
import logo from '../../assets/burger-logo.png'
import classes from './Logo.module.css'
const Logo = (props) => { return(
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={logo}  alt="Burger-builder-logo"/>
    </div>
) };
export default Logo;