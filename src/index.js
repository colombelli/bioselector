import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";
import Store from "Store";



const hist = createBrowserHistory();

ReactDOM.render(
  <Store>
  <Router history={hist}>
    <Switch>
      <Route path="/index" render={props => <AdminLayout {...props} />} />
      <Redirect to="/index/datasets" />
    </Switch>
  </Router>
  </Store>,
  document.getElementById("root")
);
