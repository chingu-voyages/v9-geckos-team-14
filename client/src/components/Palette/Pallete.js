import React, { Component } from "react";
import "./Pallete.css";
import { Link } from "react-router-dom";

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id
    };

    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpvote(event) {
    return;
  }

  handleFavorite(event) {
    return;
  }

  handleDelete(event) {
    return;
  }

  render() {
    return (
      <div className="pallete">
        <Link to={`/pallete/${this.state.id}`} className="pallete__link">
          <span className="name">{this.props.name}</span>
          <div className="color-list">
            {this.props.colors.map((color, index) => {
              return (
                <div
                  id={color._id}
                  className="color"
                  style={{ backgroundColor: color.hex }}
                  key={index}
                />
              );
            })}
          </div>
        </Link>
      </div>
    );
  }
}
