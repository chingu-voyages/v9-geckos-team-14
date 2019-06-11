import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../../resources/Helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import Button from "@material-ui/core/Button";
import "./Login.css";

// TODO: Separate to multiple components
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      token: "",
      signInMessage: "",
      signInEmail: "",
      signInPassword: "",
      signUpMessage: "",
      signUpEmail: "",
      signUpPassword: "",
      swipeIndex: 0
    };

    this.onChangeSignInEmail = this.onChangeSignInEmail.bind(this);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);
    this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
    this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);
    this.handleSwiperChangeIndex = this.handleSwiperChangeIndex.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("main_app_token");
    if (obj && obj.token) {
      const { token } = obj;
      fetch(`/api/account/verify?token=${token}`)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: token,
              loading: false
            });
          } else {
            this.setState({
              loading: false
            });
          }
        });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  onChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  handleSwiperChangeIndex(index) {
    this.setState({
      swipeIndex: index
    });
  }

  onSignUp(event) {
    const { signUpEmail, signUpPassword } = this.state;

    this.setState({
      loading: true
    });

    // post request
    fetch("/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          signUpMessage: json.message,
          loading: false
        });
      });
  }

  onSignIn(event) {
    const { signInEmail, signInPassword } = this.state;

    this.setState({
      loading: true
    });

    // post request
    fetch("/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        setInStorage("main_app_token", { token: json.token });
        this.setState({
          signUpMessage: json.message,
          loading: false,
          token: json.token
        });
      });
  }

  onLogout(event) {
    const obj = getFromStorage("main_app_token");
    if (obj && obj.token) {
      const { token } = obj;
      fetch(`/api/account/logout?token=${token}`)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              loading: false
            });
          } else {
            this.setState({
              loading: false
            });
          }
        });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const {
      loading,
      token,
      signInMessage,
      signInEmail,
      signInPassword,
      signUpMessage,
      signUpEmail,
      signUpPassword,
      swipeIndex
    } = this.state;

    return (
      <div className="login-wrapper">
        <div className="login">
          <SwipeableViews axis="x" index={swipeIndex}>
            <div className="signin">
              <Typography variant="h6" gutterBottom>
                Sign In
              </Typography>
              <TextField id="email" className="login__input" label="Email" />
              <TextField
                id="password"
                className="login__input"
                display="block"
                label="Password"
              />
              <Button
                variant="contained"
                color="default"
                className="login__btn"
              >
                Sign In
              </Button>
              <Typography
                variant="caption"
                display="inline"
                gutterBottom
                className="login__swiperToggle"
              >
                <span>Don't have an account?</span>
                <span
                  className="login__swiperToggle-link"
                  onClick={() => this.handleSwiperChangeIndex(1)}
                >
                  Sign Up
                </span>
              </Typography>
            </div>

            <div className="signup">
              <Typography variant="h6" gutterBottom>
                Sign Up
              </Typography>
              <TextField id="email" className="login__input" label="Email" />
              <TextField
                id="username"
                className="login__input"
                label="Username"
              />
              <TextField
                id="password"
                className="login__input"
                label="Password"
              />
              <TextField
                id="password_repeat"
                className="login__input"
                label="Repeat password"
              />
              <Button
                variant="contained"
                color="default"
                className="login__btn"
              >
                Sign Up
              </Button>
              <Typography
                variant="caption"
                display="inline"
                gutterBottom
                className="login__swiperToggle"
              >
                <span>Already have an account?</span>
                <span
                  className="login__swiperToggle-link"
                  onClick={() => this.handleSwiperChangeIndex(0)}
                >
                  Sign In
                </span>
              </Typography>
            </div>
          </SwipeableViews>
        </div>
      </div>
    );

    if (loading) {
      return (
        <div>
          <p>loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div>
          <div>
            {signInMessage ? <p>{signInMessage}</p> : null}
            <p>Sign In</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <div>
            {signUpMessage ? <p>{signUpMessage}</p> : null}
            <p>Sign up</p>
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onChangeSignUpEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onChangeSignUpPassword}
            />
            <br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

export default Login;
