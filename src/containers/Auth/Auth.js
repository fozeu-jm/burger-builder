import React, { Component } from 'react';
import classes from '../../components/UI/Input/Input.module.css';
import classes2 from './Auth.module.css';
import axios from 'axios';
import Aux from '../../HOC/Auxiliray';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authActions from '../../Store/actions/Auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        email: '',
        password: '',
        fail: false,
        signup: false,
        loading: false,
        auth: {
            token: '',
            userId: '',
            expiresIn: 0
        }
    }



    keyStrokeHandler(event, identifier) {
        this.setState({
            [identifier]: event.target.value
        });
    }

    authHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const data = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpsMYc1QU_gWqn8C7FmaHoKnApKaytkuE', data)
            .then(response => {
                this.setState({ loading: false });
                console.log(response);
                this.setState({
                    auth: {
                        token: response.data.idToken,
                        userId: response.data.localId,
                        expiresIn: response.data.expiresIn
                    }
                });

                this.setState({ fail: false });
                this.props.onAuthenticated(this.state.auth);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId); 
            }).catch(error => {
                console.log(error);
                this.setState({ fail: true });
            });
    }

    regHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const data = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpsMYc1QU_gWqn8C7FmaHoKnApKaytkuE', data)
            .then(response => {
                this.setState({ loading: false });
                this.setState({
                    auth: {
                        token: response.data.idToken,
                        userId: response.data.localId,
                        expiresIn: response.data.expiresIn
                    }
                });
                this.setState({ fail: false });
                this.props.onAuthenticated(this.state.auth);
                this.props.onAuthenticated(this.state.auth);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId); 
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false });
                this.setState({ fail: true });
            });
    }

    signupToggleHandler = () => {
        this.setState({ signup: !this.state.signup });
    }


    render() {
        const inputClasses = [classes.InputElement, "form-control"];
        let authen = null;

        if (this.props.isAuthenticated) {
            authen = <Redirect to="/" />
        }

        let content = (
            <Aux>
                {this.state.fail ? <p className={classes2.error}>Wrong username or password</p> : null}
                <h4>LOG IN</h4>
                <form onSubmit={this.authHandler}>

                    <div className={classes.Input}>
                        <input type="email" placeholder="enter email"
                            value={this.state.email} onChange={(event) => this.keyStrokeHandler(event, 'email')}
                            required className={inputClasses.join(' ')} />
                    </div>

                    <div className={classes.Input}>
                        <input type="password" placeholder="enter password"
                            value={this.state.password} onChange={(event) => this.keyStrokeHandler(event, 'password')}
                            required className={inputClasses.join(' ')} />
                    </div>

                    <button className={["Button", "Success"].join(' ')} type="submit">LOGIN</button>
                </form>
                <div>
                    <button className={["Button", "Danger"].join(' ')} onClick={this.signupToggleHandler}>SWITCH TO SIGNUP</button>
                </div>
            </Aux>
        );

        if (!this.state.signup) {
            content = (
                <Aux>
                    {this.state.fail ? <p className={classes2.error}>Email already exists or password too short (min length: 6)</p> : null}
                    <h4>SIGN UP</h4>
                    <form onSubmit={this.regHandler}>
                        <div className={classes.Input}>
                            <input type="email" placeholder="enter email"
                                value={this.state.email} onChange={(event) => this.keyStrokeHandler(event, 'email')}
                                required className={inputClasses.join(' ')} />
                        </div>

                        <div className={classes.Input}>
                            <input type="password" placeholder="enter password"
                                value={this.state.password} onChange={(event) => this.keyStrokeHandler(event, 'password')}
                                required className={inputClasses.join(' ')} />
                        </div>
                        <button className={["Button", "Success"].join(' ')} type="submit">SIGN UP</button>
                    </form>
                    <div>
                        <button className={["Button", "Danger"].join(' ')} onClick={this.signupToggleHandler}>SWITCH TO LOG IN</button>
                    </div>
                </Aux>
            );
        }


        return (
            <div className={classes2.Auth}>
                {authen}
                {this.state.loading ? <Spinner /> : <div className="ContactData">{content}</div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticated: (auth) => dispatch(authActions.saveAuth(auth))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);