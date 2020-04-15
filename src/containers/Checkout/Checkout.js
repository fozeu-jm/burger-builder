import React from 'react';
import { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';

import { connect } from 'react-redux';

class Checkout extends Component {
    state = {
        checkout: false,
        totalPrice: 4
    }
    componentDidMount() {
        /* console.log(this.props);
         const query = new URLSearchParams(this.props.location.search);
         const ingredients = {}
         for(let param of query.entries()){
             if( param[0] === 'price' ){
                 this.setState({totalPrice: param[1]});
             }else{
                 ingredients[param[0]] = +param[1];
             }
         }
         this.setState({ingredients: ingredients});*/
        let Zerocounter = 0;
        // convert object to [ ['lion', '🦁'], ['panda', '🐼'] ]
        // eslint-disable-next-line
        let transformedIngredients = Object.entries(this.props.ings).map((ing) => {
            if (ing[1] === 0) {
                Zerocounter++;
                return [];
            } else {
                return ing;
            }
        });
        transformedIngredients = Zerocounter === transformedIngredients.length ? this.props.history.replace('/') : transformedIngredients;

    }
    checkoutDataHandler = () => {
        this.setState({ checkout: true });
    }
    render() {

        return (
            <div>
                <CheckoutSummary price={this.props.price} form={this.state.checkout} ingredients={this.props.ings} continue={this.checkoutDataHandler} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice
    }
};


export default connect(mapStateToProps)(Checkout);