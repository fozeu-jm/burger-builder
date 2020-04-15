import React from 'react';
import Layout from './components/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as authActions from './Store/actions/Auth';
import Aux from './HOC/Auxiliray';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  render() {

    const NoMatchPage = () => {
      return (
        //  <Redirect to="/" />
        <h4>WHAT THE WHAT</h4>
      );
    };

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <Aux>
        <Layout>
        {console.log(routes)}
          {routes}
        </Layout>
      </Aux>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuth: state.login.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
