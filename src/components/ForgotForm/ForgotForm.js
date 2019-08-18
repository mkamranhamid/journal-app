import React, { useState } from 'react';

const ForgotForm = ({ show, onFormSubmit }) => {

    const [email, setEmail] = useState("");

    if (!show) return null;

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`Submitting email ${email}`);
        onFormSubmit({ email }, 'forgot');
    }

    return (
        <div className="forgot">
            <div className="header">Forgot Password?</div>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label htmlFor="email" className="labelContainer">
                        <input type="text" id="email" placeholder="&nbsp;" autoComplete="new-password" onChange={e => setEmail(e.target.value)} />
                        <span className="label">Email</span>
                        <span className="border"></span>
                    </label>
                </div>
                <div className="btn-group">
                    <button type="submit" className="button">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotForm;