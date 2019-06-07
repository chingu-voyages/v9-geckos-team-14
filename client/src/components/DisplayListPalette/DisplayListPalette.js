import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DisplayListPalette extends Component {
  render() {
    const { listPalettes } = this.props;
    return (
      <div>
        {listPalettes.map(palette => (
          <p>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName} </Link>
          </p>
        ))}
      </div>
    );
  }
}
