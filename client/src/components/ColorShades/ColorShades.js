import React, { Component } from "react";
import "./ColorShades.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ListMsg } from "../../resources/ListMsg";

export default class ColorShades extends Component {
  state = { isCopied: false };
  onCopyHandler = () => {
    this.setState(
      {
        isCopied: true
      },
      () => {
        setTimeout(() => this.setState({ isCopied: false }), 1000);
      }
    );
  };

  render() {
    const { background, name } = this.props;
    const { isCopied } = this.state;
    const msg = ["Hurray thats awsome", "Bingo", "Mind Blowing", "Frozen"];
    const randMsg = ListMsg[(Math.random() * msg.length) | 0];
    return (
      <CopyToClipboard text={background} onCopy={this.onCopyHandler}>
        <div style={{ background }} className="ColorShades">
          <div
            style={{ background }}
            className={`color-overlay ${isCopied && "display"}`}
          />
          <div className={`show-msg ${isCopied && "display"}`}>
            <h1>{randMsg}</h1>
            <p>{background}</p>
          </div>
          <div className="color-content">
            <span>{name}</span>
          </div>
          <button className="copy-btn">Copy</button>
        </div>
      </CopyToClipboard>
    );
  }
}
