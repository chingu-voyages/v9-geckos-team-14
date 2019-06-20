import React, { Component } from "react";
import PalleteList from "../PalleteList/PalleteList";
import Container from "@material-ui/core/Container";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <main>
        <Container maxWidth="lg">
          <PalleteList />
        </Container>
      </main>
    );
  }
}
