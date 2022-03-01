import { addUserAnswer, receiveUsers } from "./users";
import { addAnswer, receiveQuestions } from "./questions";
import { _saveQuestionAnswer, _getUsers, _getQuestions } from "../utils/_DATA";

export function handleInitialData() {
  return (dispatch) => {
    //get users and questions in promise a
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
      }
    );
  };
}

export function handleQuestionAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(addAnswer(authedUser, qid, answer));
      dispatch(addUserAnswer(authedUser, qid, answer));
    });
  };
}
