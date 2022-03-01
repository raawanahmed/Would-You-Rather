import React from "react";
import { connect } from "react-redux";

const LeaderBoardItem = ({ user }) => {
  return (
    <div className="col-12 justify-content-center d-flex">
      <center className=" shadow p-3 mb-5  rounded mt-3 col-3">
        <div style={{ margin: "auto", color: "#f08080" }}>{user.name}</div>
        <img src={user.avatarURL} className="card-img-top" alt={`${user}`} />
        <div>
          <div>
            Total Score:
            {Object.keys(user.answers).length + user.questions.length}
          </div>

          <div className="text-success">
            The number of questions the user answered:
            {Object.keys(user.answers).length}
          </div>
          <div className="text-danger">
            The number of questions the user asked: {user.questions.length}
          </div>
        </div>
      </center>
    </div>
  );
};

export default connect()(LeaderBoardItem);
