import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../../resources/Helper";
// import "whatwg-fetch";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      token: "",
      signUpError: "",
      signInError: ""
    };
  }

  componentDidMount() {
    const token = getFromStorage("main_app_token");
    if (token) {
      fetch(`/api/account/verify?token=${token}`)
        .then(res => res.json())
        .then(json => {
          console.log(json);
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

  // fetch('/api/verify')
  //   .then(res => res.json())
  //   .then(json => {
  //   });

  // fetch('/api/signup', { method: 'POST' })
  //   .then(res => res.json())
  //   .then(json => {
  //   });

  render() {
    const { loading, token } = this.state;

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
          <p>sign in</p>
          <p>sign up</p>
        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
      </div>
    );
  }
}

export default Login;
