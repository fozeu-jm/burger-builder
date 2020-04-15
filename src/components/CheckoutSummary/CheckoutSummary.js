import React from 'react';
import Burger from '../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import { withRouter } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import Aux from '../../HOC/Auxiliray';

const CheckoutSummary = (props) => {
    const cancelHandler = () => {
        props.history.goBack();
    }

    let content = null;

    if (props.form) {
        content = <ContactData price={props.price} ingredients={props.ingredients} />;
    } else {

        content = <Aux>
            <h1>That Looks Delicious ;) !!</h1>
            <button className={["Button", "Danger"].join(' ')} onClick={cancelHandler}>CANCEL</button>
            <button className={["Button", "Success"].join(' ')} onClick={props.continue}>CONTINUE</button>
        </Aux>;
    }

    return (
        <div className={classes.CheckoutSummary}>

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div style={{ width: '100%', margin: 'auto' }}>
                            <Burger ingredients={props.ingredients} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={classes.checkoutControls}>
                            {content}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};
export default withRouter(CheckoutSummary);