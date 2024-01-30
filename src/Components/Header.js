import React from "react";
import { Link } from "react-router-dom";
import logout from "../icon/logout.png";
import { withRouter } from "react-router";
import home from "../icon/home.png";

export function Header(props) {
  function handleLogout() {
    // code goes here to handle logout
  }
  function handleHome() {
    //code goes here to handle home icon
  }

  return (
    <>
      <nav>
      {/*code goes here for Add Member and Move Member Link*/}
      {/*Link should navigate to respective pages*/}
      </nav>
      <header>
        <h1>
          Team Tracker
          <img src={logout} alt=""/>
          <img src={home} alt=""/>
        </h1>
      </header>
    </>
  );
}

export default withRouter(Header);
