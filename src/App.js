import React, {useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";

import Login from "./components/LoginPage";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import QuestionsPage from "./components/QuestionPage";
import AddQuestion from "./components/AddQuestionPage";
import LeaderBoard from "./components/LeaderBoard";
import NotFound from "./components/NotFound";
import { Switch } from "react-router";

const App = ({ authedUser, handleInitialData }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await handleInitialData();
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return isLoading ? ( // if isLoading is true, show loading screen
    <center>
      <h1>Loading...</h1>
    </center>
  ) : (
    <div>
      {authedUser ? (
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/question/:id" exact component={QuestionsPage} />
            <Route path="/addQuestion" exact component={AddQuestion} />
            <Route path="/leaderboard" exact component={LeaderBoard} />
            <Route path="/login" exact component={Login} />
            <Route path="/notFound" exact component={NotFound} />
            <Route render={() => <Redirect to="/notFound" />} />
          </Switch>
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
