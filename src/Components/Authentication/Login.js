import React, { useState } from 'react';
import { login } from "../../ApiCalls";
import { Link } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
	const [message, setMessage] = useState("");
	const handleLogin = async e => {
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		if (!email || !password) {
			setMessage("Both email and password are required");
		}
		else {
			const result = await login(email, password);
			console.log(result);
			if (result.message === "success") {
				console.log(result);
			}
			setMessage(result.message);
		}
	}
	return (
		<div class="container">
            <div>
                {message && <p>{message}</p>}
                <p class="loginHeading">Enter your credentials</p>

                <p>Email Address</p>
                <input type="text" placeholder="Enter your email" id="email"></input>

                <p>Password</p>
                <input type="password" placeholder="Enter your password" id="password"></input>

                <button onClick={() => handleLogin()}>Login</button>
                <p>New here? <Link to="/signup/">Signup</Link></p>
            </div>
		</div>
	)
}
export default Login
