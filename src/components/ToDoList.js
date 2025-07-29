import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../style/ToDoList.css";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import AddTask from "./AddTask";
import axios from "axios";
import EditTask from "./EditTask";
import { toast } from "react-toastify";
import { useWebSocketMessage } from "../context/WebSocketContext";
import { apiUrl } from "../utils";

const ToDoList = () => {
  const location = useLocation();
  const { task, username } = location.state || {};
  const [tasks, setTasks] = useState(task);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const ws = useRef(null);
  const { webSocketMessage } = useWebSocketMessage();
  const navigate = useNavigate();

  useEffect(() => {
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = async () => {
    setShowAddTaskModal(false);
    await axios
      .post(`${apiUrl}/get-tasks-by-username`, { username })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  };

  const handleEditModalClose = () => {
    setShowEditTaskModal(false);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiUrl}/delete-task/${id}`);
      toast.success("Task deleted successfully!", {
        className: "custom-toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleClose();
    } catch (err) {
      toast.error("Failed to delete task. Please try again.", {
        className: "custom-toast  ",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error fetching tasks:", err);
    }
  };

  const getTaskDetails = async (id) => {

    try {
      const response = await axios.post(
        `${apiUrl}/get-single-task`,
        {
          id,
        }
      );
      setTaskDetails(response.data.task);
      setShowEditTaskModal(true);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const handleShow = () => setShowAddTaskModal(true);
  //   const handleEditModalShow = () => setShowEditTaskModal(true);

  return (
    <Container>
      <div>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bolder",
          }}
        >
          {username}'s tasks
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <button
            type="button"
            className="btn btn-primary add-task-button"
            onClick={handleShow}
          >
            Add Task
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={navigateToHome}
          >
            Back
          </button>
        </div>

        {Array.isArray(tasks) && tasks.length > 0 ? (
          <ul>
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Task Name</th>
                      <th scope="col">Task Priority</th>
                      <th scope="col">Task Completed?</th>
                      <th scope="col">Remaining Days</th>
                      <th scope="col">Edit Task</th>
                      <th scope="col">Delete Task</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={task.id || index}>
                        <td className="my-auto">{task.task_name}</td>
                        <td>{task.task_priority}</td>
                        <td>{task.istaskcompleted ? "Yes" : "No"}</td>
                        <td>
                          {task.remaining_days === "Overdue" ? (
                            <span style={{ color: "red" }}>
                              Deadline passed
                            </span>
                          ) : (
                            `${task.remaining_days}`
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-success me-4"
                            onClick={() => getTaskDetails(task.id)}
                          >
                            <PencilSquare className="actionButton" />
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash className="actionButton" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ul>
        ) : (
          <p>No tasks available</p>
        )}
      </div>

      <AddTask
        show={showAddTaskModal}
        handleClose={handleClose}
        username={username}
      />

      <EditTask
        show={showEditTaskModal}
        handleEditModalClose={handleEditModalClose}
        handleClose={handleClose}
        username={username}
        taskDetails={taskDetails}
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

export default ToDoList;
