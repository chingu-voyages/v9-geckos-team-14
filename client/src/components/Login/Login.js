import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../../resources/Helper";

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
      signUpPassword: ""
    };

    this.onChangeSignInEmail = this.onChangeSignInEmail.bind(this);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);
    this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
    this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);

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
      signUpPassword
    } = this.state;

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
