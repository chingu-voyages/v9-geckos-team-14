import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFromStorage, isAuthorized } from "../../resources/Helper";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./Header.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: isAuthorized()
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(event) {
    if (this.state.authorized) {
      const { token } = getFromStorage("main_app_token");
      fetch(`/api/account/logout?token=${token}`)
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
        Authorized
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
          <Toolbar className="header">
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
