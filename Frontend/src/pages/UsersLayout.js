import React from "react";
import { Route } from "react-router-dom";
import UsersAdd from "./subpages/UsersAdd";
import Users from "./subpages/UsersAll";

class UsersLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Route path="/users" exact component={Users} />
        <Route path="/users/add" component={UsersAdd} />
      </>
    );
  }
}

export default UsersLayout;
