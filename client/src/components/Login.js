import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })


  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault()
    axiosWithAuth().post("/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload)
        history.push("/bubblepage")
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="login-container">
      <div>
        Welcome to Bubbles
      </div>
      <form onSubmit={login}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
