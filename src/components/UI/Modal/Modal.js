import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../HOC/Auxiliray'
const Modal = (props) => { 
    let styles = [classes.Modal];
    props.show ? styles.push(classes.showModal) : styles.push(classes.hideModal);
return(
    <Aux>
        <div className={styles.join(' ')}>{props.children}</div>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
    </Aux>
)  
};

export default Modal;