import React from 'react';
import Aux from '../../HOC/Auxiliray';
const OrderSummary = (props) => {

    return(
        <Aux>
            <h3 className="modalTitle">Your Order</h3>
            <p className="modalP">A delicious burger with the following ingredients:</p>
            <ul className="modalUl">
                {Object.entries(props.ingredients).map((ing)=>{
                    return <li key={ing[0]}>{ing[0]}: {ing[1]}</li>
                })}
            </ul>
            <p><strong>Total Price: {props.total.toFixed(2)} €</strong></p>
            <div className="Left">
                <button className={["Button", "Danger"].join(' ')} onClick={props.modalClosed}>CANCEL</button>
                <button className={["Button", "Success"].join(' ')} onClick={props.continue}>CONTINUE</button>
            </div>
        </Aux>
    )};
export default OrderSummary;