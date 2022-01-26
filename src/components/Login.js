import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HOST from '../Host';
const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${HOST}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the authtoken
            localStorage.setItem("token", json.authToken);
            // redirecting from logIn to home component...
            props.showAlert("LoggedIN Successfully!!", "success");
            history("/");
        } else {
            props.showAlert("Invalid credentials!!", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    return <div>
        <h1 className="mt-2">Login to continue to iNoteBook web app</h1>
        <form onSubmit={handleSubmit} className="mt-2">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>;
};

export default Login;
