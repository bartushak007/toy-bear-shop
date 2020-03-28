import React from "react";

import { Route, HashRouter, Switch } from "react-router-dom";
import { Home, Login } from "./pages";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>         
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
