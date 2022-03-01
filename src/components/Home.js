import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Question from "./Question";

const Home = ({ authedUser, questions, users, ...props }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState(false);
  const [currentUserQuestions, setCurrentUserQuestions] = useState(false);

  useEffect(() => {
    setCurrentUserQuestions(getCurrentUserQuestions());
  }, [answeredQuestions]);

  const getCurrentUserQuestions = () => {
    if (!authedUser || !users[authedUser] || !users[authedUser].answers) {
      return {
        answeredQuestions: {},
        unAnsweredQuestions: {},
      };
    }

    let userAnswers = Object.keys(users[authedUser].answers);

    if (answeredQuestions === true) {
      return Object.values(questions)
        .filter((question) => userAnswers.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    } else {
      return Object.values(questions)
        .filter((question) => !userAnswers.includes(question.id))
        .sort((a, b) => a.timestamp - b.timestamp);
    }
  };

  const handleChangeQuestions = (value) => {
    setAnsweredQuestions(value);
  };

  return (
    <div>
      <center className="mt-3">
        <button
          className="btn btn-warning p-2 mx-2 me-5"
          onClick={() => handleChangeQuestions(true)}
          autoFocus={answeredQuestions}
        >
          Answered questions
        </button>
        <button
          className="btn btn-primary p-2 "
          onClick={() => handleChangeQuestions(false)}
          autoFocus={!answeredQuestions}
        >
          UnAnswered questions
        </button>
      </center>
      <div className="row mt-3 p-2">
        {Object.keys(currentUserQuestions).map((question) => (
          <div
            className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
            key={currentUserQuestions[question].id}
            item
          >
            <Question id={currentUserQuestions[question].id} />
          </div>
        ))}
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Home);
