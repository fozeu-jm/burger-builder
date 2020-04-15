import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItem/NavigationItem';
const Toolbar = (props) => { 
    let styles = ["drawerToggler"];
    styles = props.show ? ["drawerToggler active"] : ["drawerToggler"];
    return(
    <header className={classes.Toolbar}>
        <Logo height="80%"/>
        
        <span className={styles.join(' ')} onClick={props.toggle}>
            <span></span>
            <span></span>
            <span></span>
        </span>
        
        <nav className="none">
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>

) };
export default Toolbar;