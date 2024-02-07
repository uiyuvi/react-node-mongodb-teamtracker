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
    }

  getLocalStorage = () => {
    //code goes here to get token value from local storage
    return localStorage.getItem('authToken');
  };

  handleGetTeam = async () => {
    //code goes here to return the respose of technologies get api
  };

  handleChange = (e) => {
    //code goes here to handle onChange event
  };

  handleAddMember = async (e) => {
    //code goes here to handle add member button using the return value of AddRequest 
  };

  AddRequest = async () => {
    //code goes here to return the response status of add member api
  };

  handleClear = () => {
    //code goes here to handle clear button
  };

  handleAddOrDeleteTeam = (e, action) => {
    // code goes here to swtich between add or delete team
  };

  handleCancel = (e, action) => {
    //code goes here to handle cancel button
  };

  handleSave = async (e) => {
    //code goes here to handle save button
  };

  saveTeam = async () => {
    //code goes here to return the status of /technologies/add api
  };

  handleRemoveTeam = async (e, tech) => {
    //code goes here to handle remove team using the value returned from removeTeamRequest function
  };

  removeTeamRequest = async (id) => {
     //code goes here to return response status of remove technologies api
  };

  render() {
    return (
      <>
        <Header />
        <form>
          <h1>Add Team Member</h1>
          <div>
            {/*code goes here to display the input fields, Plus and Delete button*/}
            {/* create team */}
              <div className="addList">
                <p>Create New Label</p>
                {/*code goes here for the input fields and buttons to add a team*/}
              </div>

            {/* Delete Team */}
              <div className="addList">
                <p>Delete Team</p>
                {/*code goes here to display teams with a 'x' button and a cancel button*/}
                {/*teams with a x and cancel button should be displayed in a table*/}
              </div>
            )}
            {/*code goes here for the experience input field*/}
          </div>
          <div>
            <button className="button">
              Add
            </button>
            <button className="button">
              Clear
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default AddMember;
