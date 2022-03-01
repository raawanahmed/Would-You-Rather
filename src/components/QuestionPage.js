import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleQuestionAnswer } from "../actions/shared";

const QuestionsPage = ({ dispatch, authedUser, id, questions, users }) => {
  const [isAnswered, setIsAnswered] = useState(false);

  const handleChoice = (option) => {
    dispatch(handleQuestionAnswer(authedUser, id, option)).then(() =>
      setIsAnswered(true)
    );
  };

  const isQuestionAnswered = () => {
    const user = users[authedUser];
    const userAnswers = Object.keys(user.answers);
    const answered = userAnswers.find((e) => e === id) ? true : false;
    setIsAnswered(answered);
  };

  useEffect(() => {
    isQuestionAnswered();
  }, []);

  const renderUnAnsweredQuestion = () => {
    const question = questions[id];
    if (!question) return <h1> Question with the given id was not found</h1>;
    const user = users[questions[id].author];
    return (
      <div className="card shadow-lg p-3 mb-5 bg-white rounded col-3 m-auto">
        <img
          className="card-img-top"
          src={user.avatarURL}
          alt={`  ${user} `}
          style={{ width: "auto" }}
        />
        <div className="card-body" style={{ margin: "auto" }}>
          <div>{user.name} asks..</div>
          <div>Would you rather...</div>
          <button
            className="btn btn-primary"
            onClick={() => handleChoice("optionOne")}
          >
            {question.optionOne.text}{" "}
          </button>
          <div>OR</div>
          <button
            className="btn btn-primary"
            onClick={() => handleChoice("optionTwo")}
          >
            {question.optionTwo.text}
          </button>
        </div>
      </div>
    );
  };
  const renderAnsweredQuestion = () => {
    const question = questions[id];
    const totalVotes =
      question["optionOne"].votes.length + question["optionTwo"].votes.length;
    const optionOneVotePercentage = (
      (question["optionOne"].votes.length / totalVotes) *
      100
    ).toFixed(2);
    const optionTwoVotePercentage = (
      (question["optionTwo"].votes.length / totalVotes) *
      100
    ).toFixed(2);
    console.log(optionOneVotePercentage);

    if (!question) return <h1> Question with the given id was not found</h1>;
    const user = users[questions[id].author];
    const userAnswer = questions[id][user.answers[id]]?.text;

    return (
      <div className="card shadow-lg p-3 mb-5  rounded mt-3 col-3 m-auto">
        <div style={{ margin: "auto" }}>{user.name}</div>
        <img className="card-img-top" src={user.avatarURL} alt={`  ${user} `} />
        <div className="card-body m-auto">
          <div>Would you rather...</div>
          <div className="mt-3" style={{ color: "#531CB3" }}>
            your answer: {userAnswer}
          </div>
          <div className="mt-3" style={{ color: "#009FB7" }}>
          
            {optionOneVotePercentage}% choose {question.optionOne.text}
          </div>
          <div> {question["optionOne"].votes.length} votes</div>
          <div className="progress">
            {optionOneVotePercentage > 0 ? (
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  padding: 6,

                  backgroundColor: "#FE4A49",
                  border: "none",
                  color: "black",
                  borderRadius: "20px",

                  width: `${optionOneVotePercentage}%`,
                }}
              ></div>
            ) : (
              ""
            )}
          </div>

          <div className="mt-3" style={{ color: "#009FB7" }}>
            {" "}
            {optionTwoVotePercentage}% choose {question.optionTwo.text}
          </div>
          <div> {question["optionTwo"].votes.length} votes</div>
          <div className="progress">
            {optionTwoVotePercentage > 0 ? (
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  padding: 6,
                  backgroundColor: "#FE4A49",
                  border: "none",
                  color: "black",
                  borderRadius: "20px",

                  width: `${optionTwoVotePercentage}%`,
                }}
              ></div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  };

  return isAnswered ? renderAnsweredQuestion() : renderUnAnsweredQuestion();
};

function mapStateToProps({ users, questions, authedUser }, props) {
  const { id } = props.match.params;
  return {
    id,
    users,
    questions,
    authedUser,
  };
}

export default connect(mapStateToProps)(QuestionsPage);
