import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// Redux store
import store from "./store";

// Components
import Header from "components/header/Header";
import Landing from "components/landing/Landing";
import Register from "components/auth/Register";
import Login from "components/auth/Login";
import PostBook from "components/postBook/PostBook";
import NotFoundPage from "components/common/NotFoundPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/postBook" component={PostBook} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
