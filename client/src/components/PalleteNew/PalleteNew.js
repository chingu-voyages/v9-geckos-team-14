import React, { Component } from "react";
import Container from "@material-ui/core/Container";
// import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import chroma from "chroma-js";
import "./PalleteNew.css";

export default class PalleteNew extends Component {
  constructor(props) {
    super(props);

    const randomColor = chroma.random();

    this.state = {
      name: "",
      colors: [],
      currentHEX: randomColor.hex(),
      currentRGB: randomColor.rgb()
    };
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  handleRGB = index => event => {
    const { currentRGB } = this.state;
    const value = event.target.value;
    currentRGB[index] = value > 255 ? 255 : value;
    this.setState({
      currentRGB: chroma(currentRGB).rgb(),
      currentHEX: chroma(currentRGB).hex()
    });
  };

  handleHEX = event => {
    this.setState({
      currentHEX: chroma(event.target.value).hex(),
      currentRGB: chroma(event.target.value).rgb()
    });
  };

  addColor = hex => event => {
    const { colors } = this.state;
    const order = colors.length + 1;
    colors.push({ hex, order });
    this.setState({ colors: colors });
  };

  generateRandomColor = () => {
    const random = chroma.random();
    this.setState({
      currentHEX: random.hex(),
      currentRGB: random.rgb()
    });
  };

  submit = event => {
    const { name, author, colors } = this.state;
    console.log("body: ", name, author, colors);
    fetch("/api/palletes/new", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        author: author,
        colors: colors
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const { name, colors, currentHEX, currentRGB } = this.state;
    const RGB = ["R", "G", "B"];
    return (
      <Container maxWidth="lg">
        <div className="pallete-detail">
          <div className="pallete-detail__description">
            <h2>Create new color pallete</h2>
            <TextField
              id="palleteName"
              label="Name"
              value={name}
              onChange={this.handleChange("name")}
              margin="normal"
            />
          </div>
          <div className="pallete-detail__colorpicker">
            <div className="controls">
              {currentRGB.map((value, index) => {
                return (
                  <TextField
                    key={index}
                    className="rgb"
                    value={currentRGB[index]}
                    onChange={this.handleRGB(index)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {RGB[index]}
                        </InputAdornment>
                      )
                    }}
                  />
                );
              })}
              <TextField
                className="hex"
                value={currentHEX.slice(1)}
                onChange={this.handleHEX}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  )
                }}
              />
            </div>
            <div className="color">
              <div
                className="display"
                style={{ backgroundColor: currentHEX }}
              />
              <Button
                className="new-color-btn random"
                variant="contained"
                onClick={this.generateRandomColor}
              >
                Random
              </Button>
              <Button
                color="primary"
                variant="contained"
                className="new-color-btn addColor"
                onClick={this.addColor(currentHEX)}
              >
                Add Color
              </Button>
            </div>
          </div>
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
                  key={index}
                  className="color"
                  style={{
                    backgroundColor: color.hex,
                    color: fontColor
                  }}
                >
                  <span className="hex">{color.hex}</span>
                  <div className="order">{color.order}</div>
                </div>
              );
            })}
          </div>
          <Button
            className="submit-pallete"
            fullWidth
            disabled={name && colors.length ? false : true}
            size="large"
            onClick={this.submit}
          >
            Submit
          </Button>
        </div>
      </Container>
    );
  }
}
