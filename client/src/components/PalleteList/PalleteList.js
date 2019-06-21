import React, { Component } from "react";
import Pallete from "../Palette/Pallete";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import "./PalleteList.css";

export default class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      palletes: []
    };

    fetch("/api/palletes/all")
      .then(res => res.json())
      .then(res => {
        this.setState({
          palletes: res
        });
      });
  }

  render() {
    const { palletes } = this.state;
    return (
      <div className="pallete-list">
        <div className="pallete add-pallete">
          <AddCircleOutline className="add-pallete__icon" />
          <span className="add-pallete__text">Create new</span>
        </div>
        {palletes.map((pallete, index) => {
          return (
            <Pallete
              id={pallete._id}
              name={pallete.name}
              colors={pallete.colors}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}
