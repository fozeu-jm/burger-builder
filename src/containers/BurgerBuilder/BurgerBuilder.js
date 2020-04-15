import React from 'react';
import { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios.orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../Store/actions/burgerBuilder';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.95,
    cheese: 0.75,
    meat: 2
};
class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        //this.props.onInitIngredients();
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }

    closeModalHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        /* const ings = Object.entries(this.state.ingredients);
 
         const queryParams = [];
         ings.forEach(element => {
             queryParams.push(encodeURIComponent(element[0]) + '=' + encodeURIComponent(element[1]));
         });
         queryParams.push('price=' + this.state.totalPrice);
         const queryString = queryParams.join('&');
         this.props.history.push({
             pathname: '/checkout',
             search: '?' + queryString
         });*/
        this.props.history.push('checkout');
    }

    //render method compulsory for class based components huh ! if you don't what that is man i'm sorry for you 
    render() {
        const boot = ["col-md-6", "text-center"];
        let modalContent = <OrderSummary ingredients={this.props.ings} modalClosed={this.closeModalHandler}
            continue={this.purchaseContinueHandler} total={this.props.total} />;
        if (this.state.loading) {
            modalContent = <Spinner />;
        }
        return (
            <div className={["container-fluid"]}>
                <div className="row">
                    <div className={boot.join(' ')}>
                        <Modal show={this.state.purchasing} modalClosed={this.closeModalHandler}>
                            {modalContent}
                        </Modal>
                        {this.props.loadBurger ? <Spinner /> : <Burger ingredients={this.props.ings} />}
                    </div>

                    < div className={boot.join(' ')}>
                        <BuildControls total={this.props.total}
                            ingredients={this.props.ings} prices={INGREDIENT_PRICES}
                            purchasing={this.purchasingHandler}
                            isAuth={this.props.isAuthenticated}
                            ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        total: state.burger.totalPrice,
        loadBurger: state.burger.burgerLoading,
        isAuthenticated: state.login.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));