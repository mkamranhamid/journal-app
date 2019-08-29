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
            usernameAvailable: false,
            loading: false
        }
    }

    handleFormSubmitForgot() {
        console.log('Forgot Password');
    }

    handleChangeView(e, view) {
        this.setState({ view: view });
        // toastSuccess('view has been changed ' + view);
    }

    async handleFormSubmitLogin(fields, view) {
        this.setState({ loading: true });
        const { email, password } = fields;
        const queryStr = loginQuery(fields);
        try {
            const { login } = await request(queryStr, false);
            if (login) {
                setLocalStorage(TOKEN_KEY, login.token);
                toastSuccess(`Successfully logged in`);
                this.props.history.replace('home');
            }
        }
        catch (err) {
            console.log(" catch err: ", err);
        }
        this.setState({ loading: false });
    }
    async handleFormSubmitRegister(fields, view) {
        this.setState({ loading: true });
        if (!this.state.usernameAvailable) {
            toastError('Valid username field is required');
            this.setState({ loading: false });
            return
        };
        const { firstname, lastname, email, username, password } = fields;
        const queryStr = registerQuery(fields);
        try {
            const { register } = await request(queryStr, false);
            if (register) {
                setLocalStorage(TOKEN_KEY, register.token);
                toastSuccess('User has been created');
                this.props.history.replace('home');
            }
        } catch (err) {
            console.log(err);
        }
        this.setState({ loading: false });
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
                                onFormSubmit={(fields, view) => this.handleFormSubmitRegister(fields, view)}
                                loading={this.state.loading} />
                            <LoginForm show={this.state.view === 'signin'}
                                onFormSubmit={(fields, view) => this.handleFormSubmitLogin(fields, view)}
                                loading={this.state.loading} />
                            <ForgotForm show={this.state.view === 'forgot'}
                                onFormSubmit={(fields, view) => this.handleFormSubmitForgot(fields, view)}
                                loading={this.state.loading} />
                            {this.generateAuthFooterLinks()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}