import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./PalleteDetail.css";

export default class PalleteDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      author: "",
      colors: [],
      loading: true,
      editing: false
    };

    fetch(`/api/palletes/getById?id=${this.state.id}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            name: res.pallete.name,
            author: res.pallete.author,
            colors: res.pallete.colors,
            loading: false
          });
        }
      });
  }

  render() {
    const { name, author, colors, loading, editing } = this.state;
    return loading ? (
      <div className="pallete-loading">
        <CircularProgress
          size={56}
          color="primary"
          className="pallete-loading__icon"
        />
      </div>
    ) : (
      <Container maxWidth="lg">
        <div className="pallete-detail">
          <div className="pallete-detail__description">
            <h2>{name}</h2>
            {author ? <span className="author">by {author}</span> : false}
          </div>
          {editing ? (
            <div className="pallete-detail__colorpicker">color edit</div>
          ) : (
            false
          )}
          <div className="pallete-detail__colors">
            {colors.map((color, index) => {
              return (
                <div
                  className="color"
                  style={{ backgroundColor: color.hex }}
                  key={index}
                >
                  <span className="hex">{`${color.hex}`}</span>
                  <div className="order">{`${color.order}`}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    );
  }
}
