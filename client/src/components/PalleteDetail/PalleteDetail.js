import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import chroma from "chroma-js";
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
              const luminance = chroma(color.hex).luminance();
              let fontColor;

              if (luminance > 0.18) {
                fontColor = chroma(color.hex).darken(2.6);
              } else {
                fontColor = chroma(color.hex).brighten(2);
              }

              return (
                <div
                  className="color"
                  style={{
                    backgroundColor: color.hex,
                    color: fontColor
                  }}
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
