import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../../../Store/actions/Auth';

class Logout extends Component {
    componentDidMount () {
        this.props.onLogout();
    }

    render () {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authActions.logOut())
    };
};

export default connect(null, mapDispatchToProps)(Logout);