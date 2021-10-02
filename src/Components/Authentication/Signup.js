import React, { useState } from "react";
import { signup } from "../../ApiCalls";
import { Link } from "react-router-dom";
import "./css/Login.css";

const Signup = (id) => {
  console.log(id);
  const [message, setMessage] = useState("");
  const handleSignup = async (e) => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!name || !email || !password) {
      setMessage("All fields are required");
    } else {
      const result = await signup(name, email, password);
      setMessage(result.message);
    }
  };
  return (
    <div className="container">
      <div>
        <p className="loginHeading">Create an Account</p>
        {message && <p>{message}</p>}

        <p>Name</p>
        <input type="text" placeholder="Enter your Name" id="name"></input>

        <p>Email Address</p>
        <input type="text" placeholder="Enter your email" id="email"></input>

        <p>Password</p>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
        ></input>

        <button onClick={() => handleSignup()}>Signup</button>
        <p>
          Already a member? <Link to="/login/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
