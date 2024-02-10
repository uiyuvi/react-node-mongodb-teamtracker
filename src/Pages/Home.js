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
    teamName: ""
  };

  componentDidMount = async () => {
    if (!this.getLocalStorage()) {
      this.props.history && this.props.history.push('/login');
      return;
    }
    this.updateMembers();
    this.updateTeam();
  }

  updateMembers = async (url = "/api/tracker/members/display") => {
    const members = await this.handleGetMembers(url);
    const groupedMembers = members.reduce((acc, obj) => {
      const key = obj.technology_name;
      const curGroup = acc[key] ?? [];
      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
    const groupedMembersWithoutKey = Object.keys(groupedMembers).map((key) => groupedMembers[key]);

    this.setState({
      initialData: members,
      data: groupedMembersWithoutKey
    })
  }
  updateTeam = async () => {
    const techTeam = await this.handleGetTech();
    this.setState({
      team: techTeam
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
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleDeleteMembers = async (id) => {
    //code goes here to return the response status of delete api
    const response = await fetch(`/api/tracker/members/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${this.getLocalStorage()}`,
      },
      method: "Delete",
    });
    return response.json();
  };

  handleDelete = async (e, id) => {
    //code goes here to handle delete member using return value of handleDeleteMembers function
    if (e) {
      e.preventDefault()
    }
    const isDeleted = await this.handleDeleteMembers(id);
    if (isDeleted) {
      this.updateMembers();
    }
  };

  handleEdit = (id) => {
    //code goes here to handle the edit button
    const toBeEditedMember = this.state.initialData.find((member) => {
      return member._id === id;
    })
    console.log('toBeEditedMember', toBeEditedMember);
    this.setState({
      edit: true,
      editId: id,
      empId: toBeEditedMember.employee_id,
      empName: toBeEditedMember.employee_name,
      experience: toBeEditedMember.experience
    })
  };

  handleChecked = (value) => {
    //code goes here for the onChange event of radio input fields
    this.setState({
      checked: value
    })
  };

  handleClear = async (e) => {
    //code goes here to handle the clear button
    if (e) {
      e.preventDefault()
    }
    this.setState({
      experienceFilter: "",
      checked: "Expericence",
      teamName: ""
    })
  }

  handleGo = async (e) => {
    //code goes here to handle go button
    if (e) {
      e.preventDefault()
    }
    let url = "/api/tracker/members/display";
    if (this.state.experienceFilter.length > 0) {
      url = `/api/tracker/members/display?experience=${this.state.experienceFilter}`
    }
    if (this.state.teamName.length > 0) {
      url = `/api/tracker/members/display?tech=${this.state.teamName}`
    }
    if (this.state.teamName.length > 0 && this.state.experienceFilter.length > 0) {
      url = `/api/tracker/members/display?experience=${this.state.experienceFilter}&&tech=${this.state.teamName}`
    }
    this.updateMembers(url)
  };

  handleCancel = () => {
    //code goes here for cancel button 
    this.setState({
      edit: false,
      editId: "",
      empId: "",
      empName: "",
      experience: ""
    })
  };

  handleEditRequest = async () => {
    //code goes here to return response status of update api
    const response = await fetch(`/api/tracker/members/update/${this.state.editId}`, {
      body: JSON.stringify({
        employee_id: this.state.empId,
        employee_name: this.state.empName,
        experience: this.state.experience
      }),
      headers: {
        Authorization: `Bearer ${this.getLocalStorage()}`,
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "PATCH",
    });
    return response.json();
  };

  handleDone = async (e) => {
    //code goes here to handle Done button using the return value of handleEditRequest function 
    e.preventDefault();
    const isDone = this.handleEditRequest();
    if (isDone) {
      this.updateMembers();
      this.handleCancel();
    }
  };

  render() {
    let isButtonDisabled = false;
    if (this.state.checked === "Expericence" && this.state.experienceFilter === "") {
      isButtonDisabled = true;
    }
    if (this.state.checked === "Team" && this.state.teamName === "") {
      isButtonDisabled = true;
    }
    if (this.state.checked === "Both" && (this.state.experienceFilter === "" || this.state.teamName === "")) {
      isButtonDisabled = true
    }
    console.log(isButtonDisabled, this.state.checked, this.state.experienceFilter, this.state.teamName)

    return (
      <>
        <Header />
        <section>
          <label>Filter By</label>
          {/*code goes here for Radio field, */}
          <input type="radio" id="Expericence" name="Expericence" value="Expericence" checked={this.state.checked === "Expericence"} onChange={(e) => this.handleChecked(e.target.value)} />
          <label htmlFor="Expericence">Expericence</label>
          <input type="radio" id="Team" name="Team" value="Team" checked={this.state.checked === "Team"} onChange={(e) => this.handleChecked(e.target.value)} />
          <label htmlFor="Team">Team</label>
          <input type="radio" id="Both" name="Both" value="Both" checked={this.state.checked === "Both"} onChange={(e) => this.handleChecked(e.target.value)} />
          <label htmlFor="Both">Both</label>
          {/* Select and Input */}
          <select name="teamName" onChange={this.handleChange}>
            <option value="">Select Team</option>
            {this.state.team.map(({ name, _id }) => <option key={_id} value={name}>{name}</option>)}
          </select>
          <input type="number" value={this.state.experienceFilter} placeholder="Experience" list="quantities" name="experienceFilter" onChange={this.handleChange} />
          <datalist id="quantities">
            <option value="0"></option>
            <option value="1"></option>
            <option value="2"></option>
          </datalist>
          <button type="button" disabled={isButtonDisabled} onClick={(e) => this.handleGo(e)}>Go</button>
          <button type="button" onClick={(e) => this.handleClear(e)}>Clear</button>
        </section>
        {/* display teams */}
        {this.state.team.length > 0 &&
          <Teams
            data={this.state.data}
            handleCancel={this.handleCancel}
            handleChange={this.handleChange}
            handleDone={this.handleDone}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
            edit={this.state.edit}
            editId={this.state.editId}
            empId={this.state.empId}
            empName={this.state.empName}
            experience={this.state.experience}

          />}
        {this.state.team.length === 0 && <div className="noTeam">No Teams Found</div>}
        {/*Make sure, props name passed in child Component same as the state or function name which you are passing */}
      </>
    );
  }
}

export default Home;
