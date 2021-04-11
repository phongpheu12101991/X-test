import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Axios } from "./ultis/axios";
import { Button, Form, Card } from "react-bootstrap";

class Register extends React.Component {
  state = { username: "", password: "", confirmpassword: "" };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.password !== this.state.confirmpassword
    ) {
      return alert("Failed");
    }

    let x = await Axios.post("/auth/register", this.state);

    if (typeof x.data === "object") {
      alert("Register Success!");
      this.props.history.push("/login");
    } else {
      alert(x.data);
    }
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
                <Form.Label className="text-left">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.confirmpassword}
                  placeholder="Confirm your password"
                  name="confirmpassword"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <div>
                  <Button type="submit" className="mt-3 mb-3">
                    Register
                  </Button>
                </div>
                <Link to="/login">Đã có acc?Go Login</Link>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withRouter(Register);
