import React from "react";
import { Route, Switch } from "react-router-dom";
import Error404 from "./../ErrorPage/Error404";

function AppPage() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          FIRST PAGE
        </Route>
        <Route path="/u">user module</Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default AppPage;
