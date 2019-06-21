import React, { Component } from "react";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Favorite from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
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
        <Link to={`/pallete/${this.state.id}`}>
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
        <div className="controls">
          <ThumbUp className="controls__btn thumbup" />
          <Favorite className="controls__btn favorite" />
          <DeleteIcon className="controls__btn delete" />
        </div>
      </div>
    );
  }
}
