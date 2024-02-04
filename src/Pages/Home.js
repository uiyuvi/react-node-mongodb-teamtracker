import React, { Component } from "react";
import Header from "../Components/Header";
import Teams from "../Components/Teams";
import { withRouter } from "react-router";

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

  componentDidMount = async () => {
    if (!this.getLocalStorage()) {
      this.props.history && this.props.history.push('/login');
      return;
    }
    const members = await this.handleGetMembers("/api/tracker/members/display");
    const groupedMembers = members.reduce((acc, obj) => {
      const key = obj.technology_name;
      const curGroup = acc[key] ?? [];
      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
    const groupedMembersWithoutKey = Object.keys(groupedMembers).map((key) => groupedMembers[key]);
    const techTeam = await this.handleGetTech();
    this.setState({
      initialData: members,
      team: techTeam,
      data: groupedMembersWithoutKey
    })
  }

  //onMounting:     
  //if local storage had token proceed to set data in state
  //if local storage does not have token route back to login page  
  //code goes here to set initialData, team and data
  //initialData - holds the data got from back-end
  //data - holds data catagoried with team 
  //team - holds teams data got from back-end

  getLocalStorage = () => {
    //code goes here to get token value from local storage
    return localStorage.getItem('authToken');
  };

  handleGetMembers = async (url) => {
    //code goes here to return the respose of getMember api
    const response = await fetch(url, {
      headers: {
        Authorization:
          `Bearer ${this.getLocalStorage()}`,
      }
    });
    return response.json();
  };

  handleGetTech = async () => {
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

  handleClear = async () => {
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
        {this.state.team.length > 0 && <Teams team={this.state.team} />}
        {this.state.team.length === 0 && <div className="noTeam">No Teams Found</div>}
        {/*Make sure, props name passed in child Component same as the state or function name which you are passing */}
      </>
    );
  }
}

export default Home;
