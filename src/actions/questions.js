import { _saveQuestion } from "../utils/_DATA";
import { userQuestionAdded } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";
export const USER_QUESTION_ADDED = "USER_QUESTION_ADDED";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addAnswer(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER,
    qid,
    authedUser,
    answer,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(author, optionOneText, optionTwoText) {
  return (dispatch) => {
    return _saveQuestion({
      author,
      optionOneText,
      optionTwoText,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(userQuestionAdded(author, question.id));
    });
  };
}
