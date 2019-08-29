import React, { useState } from 'react';

import LoadingButton from '../LoadingButton/LoadingButton';

const RegisterForm = ({ show, onFormSubmit, checkUsernameAvailability, loading }) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!show) return null;

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`Submitting Username ${username} and Password ${password}`);
        onFormSubmit({ firstname, lastname, username, email, password }, 'register');
    }

    const handleChangeUsername = (evt) => {
        console.log(`Change Username: `, evt);
        setUsername(evt);
        setTimeout(() => {
            checkUsernameAvailability(evt);
        }, 500);
    }

    return (
        <div className="register">
            <div className="header">Registeration</div>
            {/* <form onSubmit={handleSubmit}> */}
            <div className="inputContainer">
                <label htmlFor="firstname" className="labelContainer">
                    <input type="text" id="firstname" placeholder="&nbsp;"
                        autoComplete="new-password"
                        onChange={e => setFirstname(e.target.value)}
                        disabled={loading} />
                    <span className="label">First Name</span>
                    <span className="border"></span>
                </label>
            </div>
            <div className="inputContainer">
                <label htmlFor="lastname" className="labelContainer">
                    <input type="text" id="lastname" placeholder="&nbsp;"
                        autoComplete="new-password"
                        onChange={e => setLastname(e.target.value)}
                        disabled={loading} />
                    <span className="label">Last Name</span>
                    <span className="border"></span>
                </label>
            </div>
            <div className="inputContainer">
                <label htmlFor="email" className="labelContainer">
                    <input type="email" id="email" placeholder="&nbsp;"
                        autoComplete="new-password"
                        onChange={e => setEmail(e.target.value)}
                        disabled={loading} />
                    <span className="label">Email</span>
                    <span className="border"></span>
                </label>
            </div>
            <div className="username-field-btn">
                <div className="inputContainer">
                    <label htmlFor="username" className="labelContainer">
                        <input type="text" id="username" placeholder="&nbsp;"
                            autoComplete="new-password"
                            onChange={e => handleChangeUsername(e.target.value)}
                            disabled={loading} />
                        <span className="label">Username</span>
                        <span className="border"></span>
                    </label>
                </div>
                {/* <button onClick={(e) => checkUsernameAvailability(username)}>Check availability</button> */}
            </div>
            <div className="inputContainer">
                <label htmlFor="password" className="labelContainer">
                    <input type="password" id="password" placeholder="&nbsp;"
                        autoComplete="new-password"
                        onChange={e => setPassword(e.target.value)}
                        disabled={loading} />
                    <span className="label">Password</span>
                    <span className="border"></span>
                </label>
            </div>
            <div className="btn-group">
                {/* <button type="button" className="button" onClick={handleSubmit}>Submit</button> */}
                <LoadingButton type="button" loading={loading} onClick={handleSubmit}>Submit</LoadingButton>
            </div>
            {/* </form> */}
        </div>
    )
}

export default RegisterForm;