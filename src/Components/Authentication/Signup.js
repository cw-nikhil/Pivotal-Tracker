import React, { useState } from 'react';
import { signup } from "../../ApiCalls";
import { Link } from "react-router-dom";

const Signup = (id) => {
  console.log(id);
  const [message, setMessage] = useState("");
  const handleSignup = async e => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!name || !email || !password) {
      setMessage("All fields are required");
    }
    else {
      const result = await signup(name, email, password);
      setMessage(result.message);
    }
  }
  return (
    <>
      <h1>Signup page</h1>
      {message && <p>{message}</p>}
      <input type="text" placeholder="Enter your Name" id="name"></input>
      <p>Name</p>
      <input type="text" placeholder="Enter your email" id="email"></input>
      <p>Email Address</p>
      <input type="password" placeholder="Enter your password" id="password"></input>
      <p>Password</p>
      <button onClick={() => handleSignup()}>Signup</button>
      <Link to="/login/">Login</Link>
    </>
  )
}

export default Signup
