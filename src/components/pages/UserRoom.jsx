import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../UI/Loader/Loader";
import TaskList from "../TaskList/TaskList";
const UserRoom = () => {
  const [date, setDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [username, setUsername] = useState("");
  const roomId = localStorage.getItem("roomId");
  const userId = localStorage.getItem("isAuth");
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/rooms/tasks/${roomId}`
      );
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Помилка під час отримання завдань:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const handleAddTask = async () => {
    try {
      await axios.post(
        `http://localhost:8080/tasks/createTaskInRoom/${userId}`,
        {
          title: taskTitle,
          roomId: roomId,
          day: date,
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error during creating task in room:", error.message);
    }
  };
  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:8080/rooms/addUser", {
        username: username,
        roomId: roomId,
      });
    } catch (error) {
      console.error("Error during adding user to room:", error.message);
    }
  };
  const handleInputChangeForTaskTitle = (e) => {
    setTaskTitle(e.target.value);
  };
  const handleInputChangeForUsername = (e) => {
    setUsername(e.target.value);
  };
  return (
    <Container className="text-center">
      <Row className="justify-content-center">
        <Col md={4}>
          <Form.Group>
            <Form.Control
              type="text"
              id="taskTitle"
              name="taskTitle"
              placeholder="Enter task title"
              value={taskTitle}
              onChange={handleInputChangeForTaskTitle}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Control
              type="date"
              id="taskDate"
              name="taskDate"
              value={date}
              onChange={handleDateChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Button onClick={handleAddTask} className="w-100">
            Add task
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col md={4}>
          <Form.Group>
            <Form.Control
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={handleInputChangeForUsername}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Button onClick={handleAddUser} className="w-100">
            Add user
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <div className="mt-3">
          <TaskList tasks={tasks} />
        </div>
      )}
    </Container>
  );
};

export default UserRoom;
