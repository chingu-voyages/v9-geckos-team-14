import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import "./PalleteDetail.css";

export default class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      loading: false
    };
  }

  render() {
    return (
      <Container maxWidth="lg">
        <div>Detail pallete id:{this.state.id}</div>
      </Container>
    );
  }
}
