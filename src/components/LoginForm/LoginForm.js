import React, { useState } from 'react';


function LoginForm({ show, onFormSubmit }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`Submitting Username ${email} and Password ${password}`);
        onFormSubmit({ email, password }, 'login');
    }

    if (!show) return null;
    return (
        <div className="login">
            <div className="header">Sign in</div>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label htmlFor="email" className="labelContainer">
                        <input type="text" id="email" placeholder="&nbsp;" autoComplete="new-password" onChange={e => setEmail(e.target.value)} />
                        <span className="label">Email</span>
                        <span className="border"></span>
                    </label>
                </div>
                <br />
                <div className="inputContainer">
                    <label htmlFor="password" className="labelContainer">
                        <input type="password" id="password" placeholder="&nbsp;" autoComplete="new-password" onChange={e => setPassword(e.target.value)} />
                        <span className="label">Password</span>
                        <span className="border"></span>
                    </label>
                </div>
                <div className="btn-group">
                    <button type="submit" className="button">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;


/* export function NameForm(props) {
    const [name, setName] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${name}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Frirst Name:
          <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
} */

