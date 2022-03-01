import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeAuthedUser } from "./../actions/authedUser";

const NavBar = ({ authedUser, dispatch }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light px-3">
      <Link className="navbar-brand" to="/">
        Welcome {authedUser}!
      </Link>

      <div className="mt-3" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <Link to="/addQuestion" className="nav-link">
              Add poll
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className="nav-link">
              Leaderboard
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <p
              onClick={() => dispatch(removeAuthedUser())}
              className="nav-link"
            >
              logout
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NavBar);
