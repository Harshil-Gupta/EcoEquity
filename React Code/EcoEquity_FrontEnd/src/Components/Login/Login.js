import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import CustomNavbar from "../Navbar/CustomNavbar.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('http://localhost:8085/token', {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;

        // Store the token securely (e.g., in local storage)
        localStorage.setItem('token', token);
        localStorage.setItem('user', username);
        navigate("/Dashboard"); // Redirect to the "/esg" route upon successful login
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <>
    <div className="FormContainer">
      <div className="Container">
        <form onSubmit={handleSubmit} className="Form">
          <div className="FormTitleContainer">
            <div className="FormTitle">Login</div>
          </div>

          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* <br /> */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br />
          <div>
            
            <button type="submit" style={{padding:"10px"}}>Login</button>
          </div>

          <div>
            
            {error && <p className="ErrorMessage">{error}</p>}
          </div>

          <div>
            
            <Link to="/register">Don't Have an Account? Register Now</Link>
          </div>
        </form>
      </div>
      
    </div>
    </>
  );
};

export default Login;