import React, { Component } from "react";
import Login from "../Login/Login";
import { Link } from "react-router-dom";

export default class DisplayListPalette extends Component {
  render() {
    const { listPalettes } = this.props;
    return (
      <>
        <Login />
        <div>
          {listPalettes.map(palette => (
            <p>
              <Link to={`/palette/${palette.id}`}>{palette.paletteName} </Link>
            </p>
          ))}
        </div>
      </>
    );
  }
}
