import React from "react";

import { Route, HashRouter, Switch } from "react-router-dom";
import { Home, Authentication, User, UserLots, Lots, LotsConstructor } from "./pages";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/lots" component={Lots}/>   
          <Route path="/authentication/login" component={Authentication}/>
          <Route path="/authentication/registration" component={Authentication}/>
          {/* <Route path="/user" component={User}/> */}
          <Route path="/user/profile" component={User}/>                 
          <Route path="/user/lots" component={UserLots}/>   
          <Route path="/lots-constructor/:id" component={LotsConstructor}/>           
          <Route path="/lots-constructor" component={LotsConstructor}/>               
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
