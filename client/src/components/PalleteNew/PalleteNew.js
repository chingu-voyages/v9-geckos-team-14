import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import chroma from 'chroma-js';
import {getUsername} from '../../resources/Helper';
import './PalleteNew.css';

export default class PalleteNew extends Component {
  constructor(props) {
    super(props);

    const randomColor = chroma.random();

    this.state = {
      name: '',
      author: getUsername(),
      colors: [],
      currentHEX: randomColor.hex(),
      currentRGB: randomColor.rgb(),
      loading: false,
      submitted: false,
    };
  }

  handleChange = name => event => {
    this.setState({...this.state, [name]: event.target.value});
  };

  handleRGB = index => event => {
    const {currentRGB} = this.state;
    const value = event.target.value;
    currentRGB[index] = value > 255 ? 255 : value;
    this.setState({
      currentRGB: chroma(currentRGB).rgb(),
      currentHEX: chroma(currentRGB).hex(),
    });
  };

  handleHEX = event => {
    const value = event.target.value;
    const len = value.length;

    if (len > 6) return;

    if (!chroma.valid(value)) {
      this.setState({
        currentHEX: value,
      });
      return;
    }
    this.setState({
      currentHEX: len === 3 ? value : chroma(value).hex(),
      currentRGB: chroma(value).rgb(),
    });
  };

  addColor = hex => event => {
    const {colors} = this.state;
    const order = colors.length + 1;
    colors.push({hex, order});
    this.setState({colors: colors});
  };

  generateRandomColor = () => {
    const random = chroma.random();
    this.setState({
      currentHEX: random.hex(),
      currentRGB: random.rgb(),
    });
  };

  submit = event => {
    const {name, author, colors} = this.state;
    console.log('body: ', name, author, colors);
    fetch('/api/palletes/new', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        author: author,
        colors: colors,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const {
      name,
      colors,
      currentHEX,
      currentRGB,
      loading,
      submitted,
    } = this.state;
    const RGB = ['R', 'G', 'B'];
    const submitBtnText = submitted ? 'Done!' : 'Submit';
    return (
      <Container maxWidth="lg">
        <div className="pallete-detail">
          <div className="pallete-detail__description">
            <h2>Create new color pallete</h2>
            <TextField
              id="palleteName"
              label="Name"
              value={name}
              onChange={this.handleChange('name')}
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
                      ),
                    }}
                  />
                );
              })}
              <TextField
                className="hex"
                value={currentHEX.replace('#', '')}
                onChange={this.handleHEX}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="color">
              <div
                className="display"
                style={{backgroundColor: `rgb(${currentRGB})`}}
              />
              <Button
                className="new-color-btn random"
                variant="contained"
                onClick={this.generateRandomColor}>
                Random
              </Button>
              <Button
                color="primary"
                variant="contained"
                className="new-color-btn addColor"
                onClick={this.addColor(currentHEX)}>
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
                    color: fontColor,
                  }}>
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
            onClick={this.submit}>
            {loading ? (
              <CircularProgress
                size={24}
                color="inherit"
                className="login__loading"
              />
            ) : (
              submitBtnText
            )}
          </Button>
        </div>
      </Container>
    );
  }
}
