import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, withRouter, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import { Axios } from "./ultis/axios";

class App extends React.Component {
  state = { login: false, user: "", token: "" };

  async componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    let user = localStorage.getItem("user");
    let x = await Axios.get("/auth/login", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (x.data.token) {
      this.setState({
        token: x.data.token,
        user: x.data.username,
        login: true,
      });
    } else return this.props.history.push("/login");

    localStorage.setItem("jwt", x.data.token);
    localStorage.setItem("user", x.data.username);

    if (this.props.location.pathname[1] === undefined) {
      this.props.history.push("/main");
    }

    if (this.state.login === false) {
      this.props.history.push("/login");
    }
  }

  onSubmitOk = (item) => {
    this.setState({ user: item });
    this.props.history.push("/main");
  };

  changeToken = (newToken) => {
    this.setState({ token: newToken });
  };

  render() {
    return (
      <div className="App">
        <Route path="/login">
          <Login onSubmitOk={this.onSubmitOk} changeToken={this.changeToken} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/main">
          <Main token={this.state.token} user={this.state.user} />
        </Route>
      </div>
    );
  }
}

export default withRouter(App);
