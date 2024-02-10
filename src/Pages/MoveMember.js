import React, { Component } from "react";
import Header from "../Components/Header";

class MoveMember extends Component {
  state = {
    teams: [],
    data: [],
    empId: "",
    errorStmtEmpId: "",
    from: "",
    to: ""
  };

  //onMounting
  //if local storage had token proceed to set data in state
  //if local storage does not have token route back to login page
  //code goes here to set value returned from handleGetTeam and handleGetMembers to state teams and data

  componentDidMount = async () => {
    if (!this.getLocalStorage()) {
      this.props.history && this.props.history.push('/login');
      return;
    }
    const teams = await this.handleGetTeam();
    const members = await this.handleGetMembers("/api/tracker/members/display");
    this.setState({
      teams,
      data: members
    })
  }

  getLocalStorage = () => {
    //code goes here to get and return token value from local storage
    return localStorage.getItem('authToken');
  };

  handleGetTeam = async () => {
    //code goes here to return the respose of technologies get api
    const response = await fetch('/api/tracker/technologies/get', {
      headers: {
        Authorization:
          `Bearer ${this.getLocalStorage()}`,
      }
    });
    return response.json();
  };

  handleGetMembers = async (url) => {
    //code goes here to return the response of api that is used to getMember 
    const response = await fetch(url, {
      headers: {
        Authorization:
          `Bearer ${this.getLocalStorage()}`,
      }
    });
    return response.json();
  };

  handleChange = (e) => {
    //code goes here to handle onChange for select and input fields
    let empIdErrorMessage = "";
    if (e.target.name === "empId") {
      if (e.target.value.length === 0) {
        empIdErrorMessage = "*Please enter a value";
      } else if (e.target.value < 100000 || e.target.value > 3000000) {
        empIdErrorMessage = "*Employee ID is expected between 100000 and 3000000"
      }
    }
    this.setState({
      [e.target.name]: e.target.value,
      errorStmtEmpId: empIdErrorMessage
    })
  };

  handleClear = (e) => {
    //code goes here to handle clear button
    if (e) {
      e.preventDefault()
    };
    this.setState({
      empId: "",
      errorStmtEmpId: "",
      from: "",
      to: ""
    })
  };

  MoveRequest = async (id) => {
    //code goes here to return the response status code of api that is used to move members from one team to another
    const response = await fetch(`/api/tracker/members/update/${id}`, {
      body: JSON.stringify({
        technology_name: this.state.to
      }),
      headers: {
        Authorization: `Bearer ${this.getLocalStorage()}`,
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "PATCH",
    });
    return response.json();
  };

  handleMove = async (e) => {
    //code goes here to handle move button
    e.preventDefault();
    const toBeMovedMember = this.state.data.filter(member => member.employee_id === parseInt(this.state.empId))
    const isMoved = await this.MoveRequest(toBeMovedMember[0]._id);
    if (isMoved) {

    }
  };

  render() {
    const canMove = this.state.empId.length > 0 && this.state.from.length > 0 && this.state.to.length > 0;
    return (
      <>
        <Header />
        <form className="MoveMember">
          <h1>Move Team Member</h1>
          {/*code goes here for the input field*/}
          {/*use sapn to display error msg*/}
          <div className="fromTo">
            <span>{this.state.errorStmtEmpId}</span>
            <input name="empId" type="text" value={this.state.empId} onChange={this.handleChange} />
            {/*code goes here for from and to labels and input fields*/}
            <select name="from" value={this.state.from} onChange={this.handleChange}>
              <option value="">Select Team</option>
              {this.state.teams.map(({ name, _id }) => <option key={_id} value={name}>{name}</option>)}
            </select>
            <select name="to" value={this.state.to} onChange={this.handleChange}>
              <option value="">Select Team</option>
              {this.state.teams.map(({ name, _id }) => <option key={_id} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="row3">
            <button type="button" className="add" disabled={!canMove} onClick={(e) => this.handleMove(e)}>
              Move
            </button>
            <button type="button" className="add" onClick={(e) => this.handleClear(e)}>
              Clear
            </button>
          </div>
        </form>
      </>
    );
  }
}
export default MoveMember;
