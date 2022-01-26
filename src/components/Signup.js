import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HOST from '../Host';
const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cPassword: "" });

    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${HOST}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the authtoken
            localStorage.setItem("token", json.authToken);
            // redirecting from logIn to home component...
            history("/");
            props.showAlert("Account Created Successfully!!", "success");
        } else {
            props.showAlert("Invalid details!!", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    return <div className="container">
        <h1 className="mt-2">Signup to use iNoteBook web app</h1>
        <form onSubmit={handleSubmit} className="mt-2">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5} />
            </div>
            <div className="mb-3">
                <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cPassword" name="cPassword" onChange={onChange} required minLength={5} />
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
        </form>
    </div>;
};

export default Signup;
