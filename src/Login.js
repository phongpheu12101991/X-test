import React from "react";
import { Link } from "react-router-dom";
import { Axios } from "./ultis/axios";
import { Button, Form, Card } from "react-bootstrap";

export default class Login extends React.Component {
  state = { username: "", password: "" };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.props.history);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let result = await Axios.post("/auth/login", this.state);
    if (result.data.token !== undefined) {
      console.log(result.data);
      await this.props.changeToken(result.data.token);
      await this.props.onSubmitOk(this.state.username);
      localStorage.setItem("jwt", result.data.token);
      localStorage.setItem("user", this.state.username);
    } else alert("Login Failed!");
  };
  render() {
    return (
      <div className="LoginContainer d-flex justify-content-center">
        <Card style={{ width: "30rem" }} className="mt-5">
          <Card.Body>
            <Card.Title>Welcome Job XC</Card.Title>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-left">Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.username}
                  placeholder="Enter your username"
                  name="username"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-left">Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  placeholder="Enter your password"
                  name="password"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <div>
                  <Button type="submit" className="mt-3 mb-3">
                    Login
                  </Button>
                </div>
                <Link to="/register">Chưa có account? Đăng ký</Link>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
