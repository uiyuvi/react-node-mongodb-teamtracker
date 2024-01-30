import React, { Component } from "react";
import Header from "../Components/Header";

class MoveMember extends Component {
  state = {
    teams: [],
    data: [],
    empId: "",
    errorStmtEmpId: "",
  };
    
  //onMounting
    //if local storage had token proceed to set data in state
    //if local storage does not have token route back to login page
    //code goes here to set value returned from handleGetTeam and handleGetMembers to state teams and data
    

  getLocalStorage = () => {
    //code goes here to get and return token value from local storage
  };

  handleGetTeam = async () => {
    //code goes here to return the respose of technologies get api
  };

  handleGetMembers = async (url) => {
    //code goes here to return the response of api that is used to getMember 
  };

  handleChange = (e) => {
    //code goes here to handle onChange for select and input fields
  };

  handleClear = () => {
    //code goes here to handle clear button
  };

  MoveRequest = async (id) => {
    //code goes here to return the response status code of api that is used to move members from one team to another
  };

  handleMove = async (e) => {
    //code goes here to handle move button
  };

  render() {
    return (
      <>
        <Header />
        <form className="MoveMember">
          <h1>Move Team Member</h1>
        {/*code goes here for the input field*/}
        {/*use sapn to display error msg*/}
          <div className="fromTo">
            {/*code goes here for from and to labels and input fields*/}
          </div>
          <div className="row3">
            <button className="add">
              Move
            </button>
            <button className="add">
              Clear
            </button>
          </div>
        </form>
      </>
    );
  }
}
export default MoveMember;
