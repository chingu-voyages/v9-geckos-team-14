import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../../resources/Helper";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./Header.css";

export default class Header extends Component {
  constructor(props) {
    super(props);

    let mainAppToken = getFromStorage("main_app_token");

    if (mainAppToken == null) {
      mainAppToken = {
        token: "",
        username: ""
      };
    }

    const { token, username } = mainAppToken;

    this.state = {
      authorized: token ? true : false,
      token: token,
      username: username
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(event) {
    if (this.state.authorized) {
      fetch(`/api/account/logout?token=${this.state.token}`)
        .then(res => res.json())
        .then(json => {
          localStorage.removeItem("main_app_token");
          this.setState({
            authorized: false
          });
        });
    } else {
      return;
    }
  }

  render() {
    const { authorized } = this.state;
    const profileLink = (
      <Typography className="profile-btn" onClick={this.handleLogoutClick}>
        {this.state.username}
      </Typography>
    );
    const loginLink = (
      <Link className="login-link" to="/login">
        Login
      </Link>
    );
    return (
      <header>
        <Container maxWidth="lg">
          <Toolbar className="header" disableGutters={true}>
            <Typography className="logo-link" variant="h6" color="inherit">
              <Link to="/">Palletes</Link>
            </Typography>
            <div>{authorized ? profileLink : loginLink}</div>
          </Toolbar>
        </Container>
      </header>
    );
  }
}
