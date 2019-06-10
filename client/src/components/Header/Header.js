import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <header>
        <Container maxWidth="lg">
          <Toolbar className="header">
            <Typography variant="h6" color="inherit">
              Palletes
            </Typography>
            <div>
              <Button size="small">Sign In</Button>
            </div>
          </Toolbar>
        </Container>
      </header>
    );
  }
}
