import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import decode from "jwt-decode";

import { store } from "./store";
import { setCurrentUser, addError } from "./store/actions";
import { setToken } from "./services/api";

import Navbar from "./components/layout/Navbar";
import RouteViews from "./components/RouteViews";

import "./App.css";

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);

  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(e));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <RouteViews />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
