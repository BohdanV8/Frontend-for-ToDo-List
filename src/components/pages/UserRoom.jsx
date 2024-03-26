import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../UI/Loader/Loader";
import TaskList from "../TaskList/TaskList";
import UserList from "../UserList/UserList";
const UserRoom = () => {
  const [date, setDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [username, setUsername] = useState("");
  const roomId = localStorage.getItem("roomId");
  const userId = localStorage.getItem("isAuth");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersNotInRoom, setUsersNotInRoom] = useState([]);
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

  const fetchUsersInRoom = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/rooms/getUsersInRoom/${roomId}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error(
        "Помилка під час отримання користувачів в кімнаті:",
        error.message
      );
    }
  };

  const fetchUsersNotInRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/getUsers`);
      const allUsers = response.data.users;
      const filteredUsers = allUsers.filter((user) => {
        return !users.some((userInRoom) => userInRoom.id === user.id);
      });
      const newFilteredUsers = filteredUsers.filter((user) => {
        return user.id != userId;
      });
      setUsersNotInRoom(newFilteredUsers);
      console.log(newFilteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsersInRoom();
  }, []);
  useEffect(() => {
    fetchUsersNotInRoom();
  }, [users]);
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
      setTaskTitle("");
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
      fetchUsersInRoom();
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
      <Row>
        <Col md={5}>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form.Group>
                <Form.Select
                  id="selectedUser"
                  name="selectedUser"
                  value={username}
                  onChange={handleInputChangeForUsername}
                >
                  <option value="">Select a user</option>
                  {usersNotInRoom.map((user) => (
                    <option key={user.id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button onClick={handleAddUser} className="w-100">
                Add user
              </Button>
            </Col>
          </Row>

          <Row className="justify-content-center mt-5">
            <Col>
              <h3>Users in room:</h3>
              {users.length > 0 ? (
                <UserList users={users} setUsers={setUsers} />
              ) : (
                <p>No users in room.</p>
              )}
            </Col>
          </Row>
        </Col>

        <Col md={7}>
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

          <Row className="mt-3">
            <Col>
              {isLoading ? (
                <div className="mt-5">
                  <Loader />
                </div>
              ) : (
                <div className="mt-3">
                  <TaskList tasks={tasks} />
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRoom;
