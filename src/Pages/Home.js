import React, { Component } from "react";
import Header from "../Components/Header";
import Teams from "../Components/Teams";

class Home extends Component {
  state = {
    data: [], //hold the members data catagorised based on teams
    initialData: [], //hold the members data got from backend
    team: [], //holds the teams data got from backend
    edit: false, //handle edit mode for particular member 
    editId: undefined, //holds _id of member in edit mode
    empId: "", 
    empName: "",
    experience: "",
    experienceFilter: "",
    checked: "Expericence", 
  };

   //onMounting:     
      //if local storage had token proceed to set data in state
      //if local storage does not have token route back to login page  
      //code goes here to set initialData, team and data
      //initialData - holds the data got from back-end
      //data - holds data catagoried with team 
      //team - holds teams data got from back-end

  getLocalStorage = () => {
    //code goes here to get token value from local storage
  };

  handleGetMembers = async (url) => {
    //code goes here to return the respose of getMember api
  };

  handleGetTech = async () => {
    //code goes here to return the respose of technologies get api
  };

  handleChange = (e) => {
    //code goes here to handle onChange event for input fields except radio
  };

  handleDeleteMembers = async (id) => {
    //code goes here to return the response status of delete api
  };

  handleDelete = async (e, id) => {
    //code goes here to handle delete member using return value of handleDeleteMembers function
  };

  handleEdit = (id) => {
    //code goes here to handle the edit button
  };

  handleChecked = (value) => {
    //code goes here for the onChange event of radio input fields
  };

  handleClear=async()=>{
   //code goes here to handle the clear button
  }

  handleGo = async () => {
    //code goes here to handle go button
  };

  handleCancel = () => {
    //code goes here for cancel button 
  };

  handleEditRequest = async () => {
    //code goes here to return response status of update api
  };

  handleDone = async (e) => {
    //code goes here to handle Done button using the return value of handleEditRequest function  
  };

  render() {
    return (
      <>
        <Header />
        <section>
          <label>Filter By</label>
          {/*code goes here for Radio field, */}
          {/* Select and Input */}
          <button>
            Go
          </button>
          <button>Clear</button>
        </section>
        {/* display teams */}
        <div className="noTeam">No Teams Found</div>
        {/*Make sure, props name passed in child Component same as the state or function name which you are passing */}
      </>
    );
  }
}

export default Home;
