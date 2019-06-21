import React from "react";
import { Route, Switch } from "react-router-dom";
import "./normalize.css";
import "./App.css";
import PalleteDetail from "./components/PalleteDetail/PalleteDetail";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pallete/:id" component={PalleteDetail} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
