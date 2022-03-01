import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const NotFound = () => {
  return (
    <div>
      <h1> Error 404: Page not found</h1>
    </div>
  );
};

export default withRouter(connect()(NotFound));
