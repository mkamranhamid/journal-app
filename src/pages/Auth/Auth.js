import React, { Component } from "react";

import "./Auth.css";
import { authMetaData, setLocalStorage, toastSuccess, toastError } from "../../util/common";
import { TOKEN_KEY } from "../../util/constants";
import { loginQuery, registerQuery, checkUsernameAvailability } from "../../util/queryCreator";
import { request } from "../../util/request";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import ForgotForm from "../../components/ForgotForm/ForgotForm";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 'signin',
            usernameAvailable: false
        }
    }

    handleFormSubmitForgot() {
        console.log('Forgot Password');
    }

    handleChangeView(e, view) {
        this.setState({ view: view });
        toastSuccess('view has been changed ' + view);
    }

    async handleFormSubmitLogin(fields, view) {
        const { email, password } = fields;
        const queryStr = loginQuery(fields);
        const loginRequest = await request(queryStr, false);
        if (loginRequest.login) {
            setLocalStorage(TOKEN_KEY, loginRequest.login.token);
            toastSuccess(`Successfully logged in`);
            this.props.history.replace('home');
        }
    }
    async handleFormSubmitRegister(fields, view) {
        if (!this.state.usernameAvailable) {
            toastError('Valid username field is required');
            return
        };
        const { firstname, lastname, email, username, password } = fields;
        const queryStr = registerQuery(fields);
        const userRegistered = await request(queryStr, false);
        toastSuccess('User has been created');
    }

    async handleCheckUsernameAvailability(field) {
        const username = field;
        const queryStr = checkUsernameAvailability({ username });
        const { usernameAvailability } = await request(queryStr, false);
        this.setState({ usernameAvailable: usernameAvailability.availability });
        if (usernameAvailability.availability) {
            toastSuccess(`username ${field} is available`);
        } else {
            toastError(`username ${field} is not available`);
        }
    }

    generateAuthFooterLinks() {
        const linkMetaData = authMetaData(this.state.view).Links;
        return (
            <div className="auth-links">
                {this.generateAuthFooterLinksHTML(linkMetaData)}
            </div>
        );
    }

    generateAuthFooterLinksHTML(arr) {
        return arr.map((d, i) => {
            return (
                <div className="link" key={i}>
                    <a href="javascipt:void(0)" onClick={(e) => this.handleChangeView(e, d.param)}>{d.title}</a>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="main-page" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/galaxy-1.jpg)` }}>
                <div className="main-left-portion">
                    <div className="left-portion-right">
                        <div className="main-container">
                            <RegisterForm show={this.state.view === 'register'}
                                checkUsernameAvailability={(field) => this.handleCheckUsernameAvailability(field)}
                                onFormSubmit={(fields, view) => this.handleFormSubmitRegister(fields, view)} />
                            <LoginForm show={this.state.view === 'signin'} onFormSubmit={(fields, view) => this.handleFormSubmitLogin(fields, view)} />
                            <ForgotForm show={this.state.view === 'forgot'} onFormSubmit={(fields, view) => this.handleFormSubmitForgot(fields, view)} />
                            {this.generateAuthFooterLinks()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}