import React from "react";
import { Link } from "react-router-dom";
import { Axios, HeadCtx } from "./ultis/axios";
import {
  Table,
  Container,
  Button,
  Modal,
  Form,
  ListGroup,
} from "react-bootstrap";

export default class Main extends React.Component {
  state = {
    token: "",
    username: "",
    password: "",
    show: false,
    show2: false,
    listuser: [],
    listjob: [],
    pickUser: [],
    note: "",
    deadline: "",
    jobname: "",
    jobid: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleClose2 = () => {
    this.setState({ show2: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };
  handleShow2 = (item) => {
    this.setState({
      show2: true,
      pickUser: [...item.pickUser],
      note: item.note,
      deadline: item.deadline,
      jobname: item.jobname,
      jobid: item._id,
    });
  };

  pickUser = (item) => {
    if (this.state.pickUser.indexOf(item) === -1) {
      this.setState({ pickUser: [...this.state.pickUser, item] });
    }
  };

  unPick = (item) => {
    let picklist = [...this.state.pickUser];
    for (let x of picklist) {
      if (x === item) {
        picklist.splice(picklist.indexOf(x), 1);
        break;
      }
    }
    this.setState({ pickUser: [...picklist] });
  };

  createSubmit = async () => {
    if (this.state.pickUser === []) {
      alert("Please Pick user!");
    } else if (this.state.jobname === "") {
      alert("Job name ?!");
    } else if (this.state.deadline === "") {
      alert("pick deadline ?!");
    }

    let x = await Axios.post(
      "data/createjob",
      {
        pickUser: this.state.pickUser,
        note: this.state.note,
        deadline: this.state.deadline,
        jobname: this.state.jobname,
      },
      HeadCtx(this.state.token)
    );

    alert(x.data);
    this.setState({ pickUser: [], note: "", deadline: "", jobname: "" });
  };

  updateSubmit = async (item) => {
    if (this.state.pickUser === []) {
      alert("Please Pick user!");
    } else if (this.state.jobname === "") {
      alert("Job name ?!");
    } else if (this.state.deadline === "") {
      alert("pick deadline ?!");
    }

    let x = await Axios.post(
      `/data/updatejob/${this.state.jobid}`,
      {
        pickUser: this.state.pickUser,
        note: this.state.note,
        deadline: this.state.deadline,
        jobname: this.state.jobname,
      },
      HeadCtx(this.state.token)
    );

    alert(x.data);
    this.handleClose2();
    this.getData();
  };

  delJob = async (id) => {
    let x = await Axios.get(`/data/deletejob/${id}`, HeadCtx(this.state.token));
    alert(x.data);
    this.getData();
  };

  getData = async () => {
    let xx = await Axios.get("/data/listuser", HeadCtx(this.state.token));
    if (typeof xx.data === "object") {
      this.setState({ listuser: [...xx.data] });
    }
    let y = await Axios.get("/data/alljob", HeadCtx(this.state.token));
    if (typeof y.data === "object") {
      this.setState({ listjob: [...y.data] });
    }
  };

  async componentDidMount() {
    this.setState({ token: localStorage.getItem("jwt") });
    this.getData();
  }

  render() {
    return (
      <div className="Main">
        {this.state.listuser !== [] && this.props.token ? (
          <div>
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Create Job</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Job's Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="... to do ..."
                      name="jobname"
                      value={this.state.jobname}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Click to pick User</Form.Label>

                    <Form.Control as="select" multiple>
                      {this.state.listuser.map((item) => (
                        <option
                          key={item._id}
                          onClick={() => {
                            this.pickUser(item.username);
                          }}
                        >
                          {item.username}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <ListGroup>
                    {this.state.pickUser.map((item) => (
                      <ListGroup.Item
                        variant="dark"
                        key={item}
                        className="d-flex jtc-sb"
                      >
                        <div>{item}</div>
                        <i
                          className="fas fa-trash-alt IC"
                          onClick={() => {
                            this.unPick(item);
                          }}
                        ></i>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="note"
                      value={this.state.note}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                      as="input"
                      type="date"
                      rows={3}
                      name="deadline"
                      value={this.state.deadline}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.createSubmit}>
                  Create
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={this.state.show2}
              onHide={this.handleClose2}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Update Job</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Job's Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="... to do ..."
                      name="jobname"
                      value={this.state.jobname}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Click to pick User</Form.Label>

                    <Form.Control as="select" multiple>
                      {this.state.listuser.map((item) => (
                        <option
                          key={item._id}
                          onClick={() => {
                            this.pickUser(item.username);
                          }}
                        >
                          {item.username}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <ListGroup>
                    {this.state.pickUser.map((item) => (
                      <ListGroup.Item
                        variant="dark"
                        key={item}
                        className="d-flex jtc-sb"
                      >
                        <div>{item}</div>
                        <i
                          className="fas fa-trash-alt IC"
                          onClick={() => {
                            this.unPick(item);
                          }}
                        ></i>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="note"
                      value={this.state.note}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                      as="input"
                      type="date"
                      rows={3}
                      name="deadline"
                      value={this.state.deadline}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose2}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.updateSubmit}>
                  Update
                </Button>
              </Modal.Footer>
            </Modal>

            <Container>
              <h1 className="mt-5">Welcome {this.props.user}</h1>
              <div className="w-100 display-flex jtc-fs">
                <Button variant="dark" onClick={this.handleShow}>
                  Create Job
                </Button>
              </div>

              <Table striped bordered hover variant="dark" className="mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Job's Name</th>
                    <th>User</th>
                    <th>Note</th>
                    <th>Deadline</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.listjob.map((item) => (
                    <tr key={item._id}>
                      <td>{this.state.listjob.indexOf(item) + 1}</td>
                      <td>{item.jobname}</td>
                      <td>
                        <ul>
                          {item.pickUser.map((user) => (
                            <li key={user}>{user}</li>
                          ))}
                        </ul>
                      </td>
                      <td>{item.note}</td>
                      <td>{item.deadline}</td>
                      <td
                        onClick={() => {
                          this.handleShow2(item);
                        }}
                      >
                        <i className="fas fa-user-cog IC"></i>
                      </td>
                      <td
                        onClick={() => {
                          this.delJob(item._id);
                        }}
                      >
                        <i className="fas fa-trash-alt IC"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}
