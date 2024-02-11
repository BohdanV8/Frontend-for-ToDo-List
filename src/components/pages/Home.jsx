import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../UI/Loader/Loader";
import RoomList from "../RoomList/RoomList";
import { Row, Col, Form, Button } from "react-bootstrap";
import TaskList from "../TaskList/TaskList";
const Home = () => {
  const [date, setDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const isAuth = localStorage.getItem("isAuth");
  const [isRoomsLoading, setIsRoomsLoading] = useState(true);
  const [isTasksLoading, setIsTasksLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleSelectedDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleInputChangeForTaskTitle = (e) => {
    setTaskTitle(e.target.value);
  };
  const handleAddTask = async () => {
    try {
      await axios.post(`http://localhost:8080/tasks/createTask/${isAuth}`, {
        title: taskTitle,
        day: date,
      });
    } catch (error) {
      console.error("Error during creating task for user:", error.message);
    }
  };
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/tasks/allTasks/${isAuth}`,
        {
          selectedDate,
        }
      );
      setTasks(response.data);
      setIsTasksLoading(false);
    } catch (error) {
      console.error(
        "Помилка під час отримання завдань користувача:",
        error.message
      );
    }
  };
  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/rooms/getUsersRooms/${isAuth}`
      );
      setRooms(response.data.dataCr.concat(response.data.dataAdd));
      setIsRoomsLoading(false);
    } catch (error) {
      console.error("Помилка під час отримання кімнат:", error.message);
    }
  };
  useEffect(() => {
    fetchRooms();
    fetchTasks();
  }, [isAuth]);
  const [roomTitle, setRoomTitle] = useState("");
  const handleInputChange = (e) => {
    setRoomTitle(e.target.value);
  };
  const addRoom = async () => {
    if (roomTitle) {
      try {
        await axios.post("http://localhost:8080/rooms/createRoom", {
          roomName: roomTitle,
          creatorId: isAuth,
        });
        fetchTasks();
      } catch (error) {
        console.error("Error during adding room:", error.message);
      }
    }
  };
  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        <input
          type="text"
          className="col-md-7"
          id="roomTitle"
          name="roomTitle"
          placeholder="Enter room title"
          value={roomTitle}
          onChange={handleInputChange}
        />
        <button className="col-md-3 mx-2" onClick={addRoom}>
          Add room
        </button>
      </div>

      <Row className="justify-content-center mt-3">
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
          <button onClick={handleAddTask} className="w-100">
            Add task
          </button>
        </Col>
      </Row>

      <h1 className="mt-5">Rooms</h1>
      {isRoomsLoading ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <div className="mt-3">
          <RoomList rooms={rooms} />
        </div>
      )}

      <h1 className="mt-5">Tasks</h1>

      <Row className="mt-3">
        <Col md={4}>
          <Form.Group>
            <Form.Control
              type="date"
              id="selectedDate"
              name="selectedDate"
              value={selectedDate}
              onChange={handleSelectedDateChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Button onClick={fetchTasks} className="w-100">
            Search
          </Button>
        </Col>
      </Row>

      {isTasksLoading ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <div className="mt-3">
          {/* <TaskList tasks={tasks} /> */}
          {console.log(tasks)}
        </div>
      )}
    </div>
  );
};

export default Home;
