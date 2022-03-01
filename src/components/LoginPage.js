import React, { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect} from "react-router";
import { connect } from "react-redux";

const Login = ({ dispatch, users }) => {
  const [user, setUser] = useState(null);
 

  const handleChange = (e) => {
    e.preventDefault();
    const currentUser = e.target.value;
    setUser(currentUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) alert("Please choose a user");
    dispatch(setAuthedUser(user));
    return <Redirect to="/" />;
  };

  return (
    <div className="col-12 d-flex vh-100  align-items-center justify-content-center bg-secondary">
      <div className="shadow-lg p-5 rounded col-4 d-flex flex-column justify-content-center align-items-center bg-white">
        <h3>Choose an account to login</h3>
        <select className="form-select form-select-lg" onChange={handleChange}>
          <option value="default">Choose a user</option>
          {Object.keys(users).map((user) => (
            <option key={users[user].id} value={user}>
              {user}
            </option>
          ))}
        </select>

        <button
          className="btn  btn-primary mt-3 fs-5  col-2 "
          onClick={handleSubmit}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);

