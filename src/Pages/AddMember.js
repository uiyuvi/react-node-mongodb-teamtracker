import React, { Component } from "react";
import Header from "../Components/Header";
import remove from "../icon/close.png";

class AddMember extends Component {
  state = {
    empId: "",
    empName: "",
    teamName: "",
    experience: "",
    newTeam: "",
    createTeam: false,
    deleteTeam: false,
    teams: [],
    errorStmtEmpId: "",
    errorStmtEmpName: "",
    errorStmtExperience: "",
  };

  //onMounting
  //if local storage had token proceed to set data in state
  //if local storage does not have token route back to login page
  //code goes here to set value returned from handleGetTeam to teams state
  componentDidMount = async () => {
    if (!this.getLocalStorage()) {
      this.props.history && this.props.history.push('/login');
      return;
    }
    const teams = await this.handleGetTeam();
    this.setState({
      teams
    })
  }

  getLocalStorage = () => {
    //code goes here to get token value from local storage
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

  handleChange = (e) => {
    //code goes here to handle onChange event
    let empIdErrorMessage = "";
    let empNameErrorMessage = "";
    let experienceErrorMessage = "";
    if (e.target.name === "empId") {
      if (e.target.value.length === 0) {
        empIdErrorMessage = "*Please enter a value";
      } else if (e.target.value < 100000 || e.target.value > 3000000) {
        empIdErrorMessage = "*Employee ID is expected between 100000 and 3000000"
      }
    }
    if (e.target.name === "empName") {
      if (!(e.target.value.length >= 3)) {
        empNameErrorMessage = "Employee Name should have atleast 3 letters"
      }
      if (!/^[a-zA-Z ]*$/ig.test(e.target.value)) {
        empNameErrorMessage = "Employee name can have only alphabets and spaces";
      }
      if (e.target.value.length === 0) {
        empNameErrorMessage = "*Please enter a value";
      }
    }

    if (e.target.name === "experience" && e.target.value.length === 0) {
      experienceErrorMessage = "*Please enter a value";
    }

    this.setState({
      [e.target.name]: e.target.value,
      errorStmtEmpId: empIdErrorMessage,
      errorStmtEmpName: empNameErrorMessage,
      errorStmtExperience: experienceErrorMessage
    })
  };

  handleAddMember = async (e) => {
    //code goes here to handle add member button using the return value of AddRequest 
    e.preventDefault();
    const isAdded = await this.AddRequest();
    console.log(isAdded)
    if (isAdded) {
      this.handleClear();
    }
  };

  AddRequest = async () => {
    //code goes here to return the response status of add member api
    const response = await fetch('/api/tracker/members/add', {
      body: JSON.stringify({
        employee_id: this.state.empId,
        employee_name: this.state.empName,
        technology_name: this.state.teamName,
        experience: this.state.experience
      }),
      headers: {
        Authorization: `Bearer ${this.getLocalStorage()}`,
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "post",
    });
    return response.json();
  };

  handleClear = (e) => {
    if (e) {
      e.preventDefault()
    }
    //code goes here to handle clear button
    this.setState({
      empId: "",
      empName: "",
      teamName: "",
      experience: ""
    })
  };

  handleAddOrDeleteTeam = (e, action) => {
    // code goes here to swtich between add or delete team
    e.preventDefault();
    this.setState({
      createTeam: action === "Add",
      deleteTeam: action === "Delete"
    })
  };

  handleCancel = (e, action) => {
    //code goes here to handle cancel button
    e.preventDefault();
    this.setState({
      createTeam: false,
      deleteTeam: false
    })
  };

  handleSave = async (e) => {
    //code goes here to handle save button
    e.preventDefault();
    const isTeamSaved = await this.saveTeam();
    console.log(isTeamSaved)
    if (isTeamSaved) {
      this.setState({
        teams: this.state.teams.concat({ name: this.state.newTeam }),
        createTeam: false,
        newTeam: ""
      })
    }
  };

  saveTeam = async () => {
    //code goes here to return the status of /technologies/add api
    const response = await fetch('/api/tracker/technologies/add', {
      headers: {
        Authorization: `Bearer ${this.getLocalStorage()}`,
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "post",
      body: JSON.stringify({ technology_name: this.state.newTeam })
    });
    return response.json();
  };

  handleRemoveTeam = async (e, tech) => {
    //code goes here to handle remove team using the value returned from removeTeamRequest function
    e.preventDefault();
    const isDeleted = await this.removeTeamRequest(tech);
    if (isDeleted) {
      this.setState({
        teams: this.state.teams.filter(team => team.name !== tech)
      })
    }
  };

  removeTeamRequest = async (id) => {
    //code goes here to return response status of remove technologies api
    const response = await fetch(`/api/tracker/technologies/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${this.getLocalStorage()}`
      },
      method: "Delete"
    });
    return response.json();
  };

  render() {
    const canEnableAdd = this.state.empId.length > 0 && this.state.empName.length > 0 && this.state.experience.length > 0 && this.state.teamName.length > 0;

    return (
      <>
        <Header />
        <form>
          <h1>Add Team Member</h1>
          <div>
            {/*code goes here to display the input fields, Plus and Delete button*/}
            <span>{this.state.errorStmtEmpId}</span>
            <span>{this.state.errorStmtEmpName}</span>
            <span>{this.state.errorStmtExperience}</span>
            <input type="text" name="empId" value={this.state.empId} onChange={this.handleChange} />
            <input type="text" name="empName" value={this.state.empName} onChange={this.handleChange} />
            <select name="teamName" value={this.state.teamName} onChange={this.handleChange}>
              <option value="">Select Team</option>
              {this.state.teams.map(({ name, _id }) => <option key={_id} value={name}>{name}</option>)}
            </select>
            <button type="button" onClick={(e) => this.handleAddOrDeleteTeam(e, "Add")}>+</button>
            <button type="button" onClick={(e) => this.handleAddOrDeleteTeam(e, "Delete")}>Delete</button>
            {/* create team */}
            {this.state.createTeam && (
              <div className="addList">
                <p>Create New Label</p>
                {/*code goes here for the input fields and buttons to add a team*/}
                <input type="text" value={this.state.newTeam} onChange={(e) => this.setState({ newTeam: e.target.value })} />
                <button name="addmember" type="button" onClick={this.handleSave} disabled={this.state.newTeam.length === 0}>Save</button>
                <button name="cancel" type="button" onClick={(e) => this.handleCancel(e, "Add")}>Cancel</button>
              </div>
            )}

            {/* Delete Team */}
            {this.state.deleteTeam && (
              <div className="addList">
                <p>Delete Team</p>
                {/*code goes here to display teams with a 'x' button and a cancel button*/}
                {/*teams with a x and cancel button should be displayed in a table*/}
                <table>
                  <tbody>
                    {this.state.teams.map(({ name, _id }) => <tr key={_id} value={name}><td>{name}</td><td><img height="10px" width="10px" src={remove} alt="x" onClick={(e) => this.handleRemoveTeam(e, name)}></img></td></tr>)}
                    <tr><td><button onClick={(e) => this.handleCancel(e, "Delete")}>Cancel</button></td></tr>
                  </tbody>
                </table>
              </div>
            )}
            {/*code goes here for the experience input field*/}
            <input type="text" name="experience" value={this.state.experience} onChange={this.handleChange} />
          </div>
          <div>
            <button type="button" className="button" onClick={(e) => this.handleAddMember(e)} disabled={!canEnableAdd}>
              Add
            </button>
            <button type="button" className="button" onClick={(e) => this.handleClear(e)}>
              Clear
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default AddMember;
