import React, { Component } from "react";

class Login extends Component {
  state = {
    name: "",
    password: ""
  };

  //onMounting token stored in localStorage should be removed
  componentDidMount(){
    localStorage.removeItem("authToken")
  }

  handleChange = (e) => {
    //code goes here to handle onChange event for input fields
    this.setState({
      [e.target.name]: e.target.value
    })

  };

  loginRequest = async () => {
    //code goes here to return the response after hitting login api
    const response = await fetch("/api/admin/login", {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password
      })
    });
    return response.json();
    
  };

  handleLogin = async () => {
    //handles login button
    //based on the login response, token should be set in local storage or alert should be displayed
    const response = await this.loginRequest();
    if (!response.token) {
      alert("Invalid credentials!");
      return;
    }
    localStorage.setItem("authToken", response.token);
    this.props.history.push("/")
  };

  isValidForm = () => {
    return this.state.name.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        {/*code goes here to display input field to get name and password*/}
        <input type="text" name="name" onChange={(e) => this.handleChange(e)} value={this.state.name} />
        <input type="password" name="password" onChange={(e) => this.handleChange(e)} value={this.state.password} />
        <button type="button" disabled={!this.isValidForm()} onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
