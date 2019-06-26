import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../../resources/Helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import "./Login.css";

// TODO: Separate to multiple components
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      token: "",
      signInStatus: {
        username: {
          ok: true,
          value: "",
          message: ""
        },
        password: {
          ok: true,
          value: "",
          message: ""
        }
      },
      signUpStatus: {
        email: {
          ok: true,
          value: "",
          message: ""
        },
        username: {
          ok: true,
          value: "",
          message: ""
        },
        password: {
          ok: true,
          value: "",
          message: ""
        },
        repeat: {
          ok: true,
          value: "",
          message: ""
        }
      },
      signUpPasswordsMatch: true,
      signUpReady: false,
      signedUp: false,
      signInReady: false,
      swipeIndex: 0
    };

    this.onChangeSignInUsername = this.onChangeSignInUsername.bind(this);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);

    this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
    this.onChangeSignUpUsername = this.onChangeSignUpUsername.bind(this);
    this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);
    this.onChangeSignUpPasswordRepeat = this.onChangeSignUpPasswordRepeat.bind(
      this
    );
    this.checkSignUpReady = this.checkSignUpReady.bind(this);
    this.checkSignInReady = this.checkSignInReady.bind(this);

    this.handleSwiperChangeIndex = this.handleSwiperChangeIndex.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
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

  onChangeSignInUsername(event) {
    const { signInStatus } = this.state;
    signInStatus.username.value = event.target.value;
    this.setState({
      signInStatus: signInStatus
    });
  }

  onChangeSignInPassword(event) {
    const { signInStatus } = this.state;
    signInStatus.password.value = event.target.value;
    this.setState({
      signInStatus: signInStatus
    });
  }

  onChangeSignUpEmail(event) {
    const { signUpStatus } = this.state;
    signUpStatus.email.value = event.target.value;
    this.setState({
      signUpStatus: signUpStatus
    });
  }

  onChangeSignUpUsername(event) {
    const { signUpStatus } = this.state;
    signUpStatus.username.value = event.target.value;
    this.setState({
      signUpStatus: signUpStatus
    });
  }

  onChangeSignUpPassword(event) {
    const { signUpStatus } = this.state;
    signUpStatus.password.value = event.target.value;
    this.setState({
      signUpStatus: signUpStatus
    });
  }

  onChangeSignUpPasswordRepeat(event) {
    const { signUpStatus } = this.state;
    signUpStatus.repeat.value = event.target.value;
    const { password, repeat } = signUpStatus;
    if (password.value !== repeat.value) {
      signUpStatus.repeat.ok = false;
    } else {
      signUpStatus.repeat.ok = true;
    }
    this.setState({
      signUpStatus: signUpStatus
    });
  }

  handleSwiperChangeIndex(index) {
    this.setState({
      swipeIndex: index
    });
  }

  checkSignInReady(event) {
    const { username, password } = this.state.signInStatus;

    if (username.value && password.value) {
      this.setState({
        signInReady: true
      });
    } else {
      this.setState({
        signInReady: false
      });
    }
  }

  checkSignUpReady(event) {
    const { email, username, password, repeat } = this.state.signUpStatus;
    const passwordsMatch = password.value === repeat.value;

    if (email.value && username.value && password.value && passwordsMatch) {
      this.setState({
        signUpReady: true
      });
    } else {
      this.setState({
        signUpReady: false
      });
    }
  }

  onSignUp(event) {
    const { signUpStatus, signInStatus } = this.state;

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
        email: signUpStatus.email.value,
        username: signUpStatus.username.value,
        password: signUpStatus.password.value
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        signUpStatus.email.ok = json.email.ok;
        signUpStatus.email.message = json.email.message;
        signUpStatus.username.ok = json.username.ok;
        signUpStatus.username.message = json.username.message;
        signUpStatus.password.ok = json.password.ok;
        signUpStatus.password.message = json.password.message;
        signInStatus.username.value = signUpStatus.username.value;
        this.setState({
          loading: false,
          signedUp: true,
          signUpStatus: signUpStatus,
          signInStatus: signInStatus,
          swipeIndex: 0
        });
      });
  }

  onSignIn(event) {
    const { signInStatus } = this.state;

    this.setState({ loading: true });

    // post request
    fetch("/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: signInStatus.username.value,
        password: signInStatus.password.value
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInStorage("main_app_token", {
          token: json.token,
          username: json.username
        });
        signInStatus.username.ok = json.username.ok;
        signInStatus.username.message = json.username.message;
        signInStatus.password.ok = json.password.ok;
        signInStatus.password.message = json.password.message;

        setTimeout(() => {
          this.setState({
            loading: false,
            success: json.success,
            token: json.token,
            signInStatus: signInStatus
          });
        }, 1000);
      });
  }

  render() {
    const {
      loading,
      token,
      signInStatus,
      signUpStatus,
      signInReady,
      signUpReady,
      signedUp,
      swipeIndex
    } = this.state;

    if (token) {
      window.location = "/";
    }

    return (
      <div className="login-wrapper">
        <div className="login">
          <SwipeableViews axis="x" index={swipeIndex}>
            <div className="signin" onChange={this.checkSignInReady}>
              <Typography variant="h6" gutterBottom>
                Sign In
              </Typography>
              {signedUp ? (
                <Typography
                  variant="subtitle2"
                  color="primary"
                  gutterTop
                  gutterBottom
                >
                  Congratulations! Now you can Sign In.
                </Typography>
              ) : (
                false
              )}

              <TextField
                id="username"
                className="login__input"
                label={
                  signInStatus.username.message
                    ? signInStatus.username.message
                    : "Username"
                }
                error={!signInStatus.username.ok}
                value={signInStatus.username.value}
                onChange={this.onChangeSignInUsername}
              />
              <TextField
                id="password"
                className="login__input"
                label={
                  signInStatus.password.message
                    ? signInStatus.password.message
                    : "Password"
                }
                type="password"
                error={!signInStatus.password.ok}
                value={signInStatus.password.value}
                onChange={this.onChangeSignInPassword}
              />
              <Button
                variant="contained"
                color="primary"
                className="login__btn"
                disabled={!signInReady}
                onClick={this.onSignIn}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    color="inherit"
                    className="login__loading"
                  />
                ) : (
                  "Sign In"
                )}
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

            <div className="signup" onChange={this.checkSignUpReady}>
              <Typography variant="h6" gutterBottom>
                Sign Up
              </Typography>
              <TextField
                id="email"
                className="login__input"
                label={
                  signUpStatus.email.message
                    ? signUpStatus.email.message
                    : "Email"
                }
                error={!signUpStatus.email.ok}
                value={signUpStatus.email.value}
                onChange={this.onChangeSignUpEmail}
              />
              <TextField
                id="username"
                className="login__input"
                label={
                  signUpStatus.username.message
                    ? signUpStatus.username.message
                    : "Username"
                }
                error={!signUpStatus.username.ok}
                value={signUpStatus.username.value}
                onChange={this.onChangeSignUpUsername}
              />
              <TextField
                id="password"
                className="login__input"
                type="password"
                label={
                  signUpStatus.password.message
                    ? signUpStatus.password.message
                    : "Password"
                }
                error={!signUpStatus.password.ok}
                onChange={this.onChangeSignUpPassword}
              />
              <TextField
                id="password_repeat"
                className="login__input"
                type="password"
                label="Repeat password"
                error={!signUpStatus.repeat.ok}
                onChange={this.onChangeSignUpPasswordRepeat}
              />
              <Button
                variant="contained"
                color="primary"
                className="login__btn"
                disabled={!signUpReady}
                onClick={this.onSignUp}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    color="inherit"
                    className="login__loading"
                  />
                ) : (
                  "Sign Up"
                )}
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
  }
}

export default Login;
