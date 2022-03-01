import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Question = ({ questions, users, id }) => {
  const question = questions[id];
  const currentUser = users[questions[id].author];
  return (
    <div className="card shadow-lg p-3 mb-5 bg-white rounded">
      <img
        src={currentUser.avatarURL}
        className="card-img-top"
        alt={`  ${currentUser} `}
        style={{ width: "auto", height: "auto" }}
      />
      <div className="card-body">
        <div>{currentUser.name} asks..</div>
        <div>Would you rather...</div>
        <div className="card-title">{question.optionOne.text} </div>
        <div>OR</div>
        <div className="card-title">{question.optionTwo.text} </div>

        <Link to={`/question/${id}`}>
          <button className="btn btn-primary text-center">Choose</button>
        </Link>
      </div>
    </div>
  );
};

function mapStateToProps({ users, questions }) {
  return {
    users,
    questions,
  };
}

export default connect(mapStateToProps)(Question);
