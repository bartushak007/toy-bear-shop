import React from "react";

import { Route, HashRouter, Switch } from "react-router-dom";
import { Home, Authentication, User } from "./pages";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/authentication/login" component={Authentication}/>
          <Route path="/authentication/registration" component={Authentication}/>
          <Route path="/user" component={User}/>                 
          <Route path="/user/profile" component={User}/>                 
          <Route path="/about">
            <div>456</div>
          </Route>
          <Route>
            <div>789</div>
          </Route>
        </Switch>{" "}
      </HashRouter>
    </div>
  );
}

export default App;
