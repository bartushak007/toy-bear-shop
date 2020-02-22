import React from "react";
import Layout from "./components/layout";
import { Route, HashRouter, Switch } from "react-router-dom";
import { Home } from './pages'
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <div>456</div>
            </Route>
            <Route>
              <div>789</div>
            </Route>
          </Switch>
        </Layout>{" "}
      </HashRouter>
    </div>
  );
}

export default App;
