import React from "react";

import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useHistory, withRouter } from "react-router";


const AddQuestion = ({ dispatch, authedUser }) => {
  const [optionOne, setOptionOne] = React.useState("");
  const [optionTwo, setOptionTwo] = React.useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!optionOne || !optionTwo) {
      return alert("Please enter a valid question");
    }
    dispatch(handleAddQuestion(authedUser, optionOne, optionTwo));

    alert("Question added :)");
    return history.push("/");
  };

  const handleOptionOneTextChange = (e) => {
    const value = e.target.value;
    setOptionOne(value);
  };

  const handleOptionTwoTextChange = (e) => {
    const value = e.target.value;
    setOptionTwo(value);
  };

  return (
    <div className="col-12">
      <div
        className="card shadow rounded col-4 p-5"
        style={{
          maxWidth: "auto",
          margin: "auto",
        }}
      >
        <center>Add poll</center>
        <div className="mt-4 mb-3">Would you rather...</div>
        <input
          className="form-control"
          value={optionOne}
          name="optionOne"
          label="Enter your first option"
          onChange={handleOptionOneTextChange}
        />
        <div className="mt-2">OR</div>
        <input
          className="form-control"
          value={optionTwo}
          name="optionOne"
          label="Enter your second option"
          onChange={handleOptionTwoTextChange}
        />
        <button className="btn btn-primary mt-5 m-auto" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return { authedUser };
}
export default withRouter(connect(mapStateToProps)(AddQuestion));

