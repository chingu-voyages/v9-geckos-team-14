import React, { Component } from "react";
import "./Navbar.css";
import { Route, Switch, Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <div>
          {" "}
          <Link role="button" to="/">
            <button className="ui icon button arrow-btn">
              <i className="hand point left icon" />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
