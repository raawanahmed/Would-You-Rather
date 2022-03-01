import React from "react";
import { connect } from "react-redux";
import LeaderBoardItem from "./LeaderBoardItem";

const LeaderBoard = ({ users }) => {
  const usersSorted = Object.values(users).sort(
    (x, y) =>
      Object.keys(y.answers).length +
      Object.keys(y.questions).length -
      (Object.keys(x.answers).length + Object.keys(x.questions).length)
  );
  return (
    <div>
      {usersSorted.map((user) => (
        <LeaderBoardItem key={user.id} user={user} />
      ))}
    </div>
  );
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}
export default connect(mapStateToProps)(LeaderBoard);
