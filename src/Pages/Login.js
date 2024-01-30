import React, { Component } from "react";

class Login extends Component {
  state = {
    name: "",
    password: "",
  };

    //onMounting token stored in localStorage should be removed

  handleChange = (e) => {
    //code goes here to handle onChange event for input fields
  };

  loginRequest = async () => {
    //code goes here to return the response after hitting login api
  };

  handleLogin = async () => {
     //handles login button
    //based on the login response, token should be set in local storage or alert should be displayed
  };

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        {/*code goes here to display input field to get name and password*/}
        <button>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
