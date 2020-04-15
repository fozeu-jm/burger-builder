import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItem/NavigationItem';
import classes from './SideDrawer.module.css';
import Aux from '../../../HOC/Auxiliray'
import Backdrop from '../../UI/Backdrop/Backdrop';
const SideDrawer = (props) => { 
    let styles = [classes.SideDrawer];
    styles = props.show ? [classes.SideDrawer,classes.Open] : [classes.SideDrawer,classes.Close];
    return(
        <Aux>
            <Backdrop show={props.show} clicked={props.toggle}/>
            <div className={styles.join(' ')}>
                <Logo height="11%"/>
                <nav className="mt-3">
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
) };
export default SideDrawer;