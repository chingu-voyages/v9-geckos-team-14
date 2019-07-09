import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
            loading: false,
            copied: false
          });
        }
      });
  }

  onCopyHandler = event => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 600);
  };

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
                <CopyToClipboard
                  text={color.hex}
                  onCopy={this.onCopyHandler}
                  key={index}
                >
                  <div
                    className="color"
                    style={{
                      backgroundColor: color.hex,
                      color: fontColor
                    }}
                  >
                    <span className="hex">{color.hex}</span>
                    <div className="order">{color.order}</div>
                  </div>
                </CopyToClipboard>
              );
            })}
          </div>
          {this.state.copied ? <span className="copied">Copied!</span> : false}
        </div>
      </Container>
    );
  }
}
