// App.js File
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import AddUser from "./AddUser";
import { useWebSocketMessage } from "../context/WebSocketContext";
import { apiUrl, apiVersion } from "../utils";

const HomePage = () => {
  const navigate = useNavigate();
  const [addUserModalShow, setAddUserModalShow] = useState(false);
  const [username, setUsername] = useState("");
  const { webSocketMessage } = useWebSocketMessage();
  const ws = useRef(null);

  const getAllTasks = async () => {
    await axios
      .post(`${apiUrl}/${apiVersion}/get-tasks-by-username`, { username })
      .then((res) => {
        navigate("/my-tasks", {
          state: { task: res.data.tasks, username: username },
        });
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  };

  const handleAddUserModal = () => setAddUserModalShow(true);

  const handleAddUserModalClose = async () => {
    setAddUserModalShow(false);
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        TODO LIST Version 2
      </Row>

      <hr />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Username"
              size="lg"
              aria-label="add something"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <InputGroup>
              <Button
                variant="dark"
                className="mt-3 mx-auto"
                onClick={getAllTasks}
              >
                Get Tasks
              </Button>
            </InputGroup>
          </InputGroup>
          <span>
            If you are a new user,{" "}
            <Button
              style={{ padding: "0px", textDecoration: "none" }}
              variant="link"
              onClick={handleAddUserModal}
            >
              click here
            </Button>{" "}
          </span>
        </Col>
      </Row>

      <AddUser
        show={addUserModalShow}
        handleAddUserModalClose={handleAddUserModalClose}
      />

      {webSocketMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "10px",
            color: "black",
            padding: "8px 12px",
            border: "1px solid black",
            borderRadius: "4px",
            fontSize: "1.3rem",
            fontWeight: "bold",
            zIndex: 9999,
          }}
        >
          {webSocketMessage}
        </div>
      )}
    </Container>
  );
};

export default HomePage;