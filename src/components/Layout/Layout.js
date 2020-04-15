import React, { Component } from 'react';
import Aux from '../../HOC/Auxiliray';
import classes from './layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        showDrawer: false
    }

    toggleSideDrawerHandler = () => {
        const current = this.state.showDrawer;
        this.setState({ showDrawer: !current })

    }
    render() {
        return (
            //use of auxiliary component for wrap more verbose than that you die ! lol
            <Aux>
                <Toolbar toggle={this.toggleSideDrawerHandler} 
                isAuth={this.props.isAuthenticated}
                show={this.state.showDrawer} />
                <SideDrawer show={this.state.showDrawer} isAuth={this.props.isAuthenticated} toggle={this.toggleSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.auth.token !== null
    }
}

export default connect( mapStateToProps )( Layout );