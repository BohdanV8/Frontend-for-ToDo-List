import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../UI/Loader/Loader";
import RoomList from "../RoomList/RoomList";
import { Row, Col, Form, Button } from "react-bootstrap";
import TaskList from "../TaskList/TaskList";

const Home = () => {
  const [date, setDate] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const isAuth = localStorage.getItem("isAuth");
  const [isRoomsLoading, setIsRoomsLoading] = useState(true);
  const [isTasksLoading, setIsTasksLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [selectedField, setSelectedField] = useState("title");
  const [selectedSortOrder, setSelectedSortOrder] = useState("asc");
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const handleSortOrderChange = (e) => {
    setSelectedSortOrder(e.target.value);
  };
  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
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
      fetchTasks();
    } catch (error) {
      console.error("Error during creating task for user:", error.message);
    }
  };

  const fetchTasks = async () => {
    setIsTasksLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/tasks/allTasks/${isAuth}`,
        {
          selectedDate,
        }
      );
      setTasks(response.data);
      setIsTasksLoading(false);
    } catch (error) {
      console.error("Error fetching user tasks:", error.message);
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
      console.error("Error fetching rooms:", error.message);
    }
  };

  const fetchTasksByDate = async () => {
    setIsTasksLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/tasks/searchByDate/${isAuth}?fromDate=${startDate}&toDate=${endDate}`
      );
      setTasks(response);
      setIsTasksLoading(false);
    } catch (error) {
      console.error("Error fetching user tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [isAuth]);

  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchTasksByDate();
    }
  }, [startDate, endDate]);

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
        fetchRooms();
      } catch (error) {
        console.error("Error adding room:", error.message);
      }
    }
  };

  const filterByStatus = async () => {
    setIsTasksLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/tasks/filterByStatus/${isAuth}?status=${selectedStatus}`
      );
      setTasks(response);
      setIsTasksLoading(false);
    } catch (error) {
      console.error("Error fetching user tasks:", error.message);
    }
  };

  const sortByKey = async () => {
    setIsTasksLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/tasks/sortByKey/${isAuth}?sortField=${selectedField}&sortOrder=${selectedSortOrder}`
      );
      setTasks(response);
      setIsTasksLoading(false);
    } catch (error) {
      console.error("Error fetching user tasks:", error.message);
    }
  };

  return (
    <div className="container">
      <Row className="mt-5">
        <Col md={6}>
          <div className="mb-4">
            <h2>Add Room</h2>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Enter room title"
                value={roomTitle}
                onChange={handleInputChange}
              />
              <Button className="btn btn-primary" onClick={addRoom}>
                Add
              </Button>
            </div>
          </div>
          <div>
            <h2>Rooms</h2>
            {isRoomsLoading ? (
              <div className="mt-3">
                <Loader />
              </div>
            ) : (
              <div className="mt-3">
                <RoomList rooms={rooms} />
              </div>
            )}
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-4">
            <h2>Add Task</h2>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={handleInputChangeForTaskTitle}
              />
              <Form.Control
                type="date"
                className="me-2"
                value={date}
                onChange={handleDateChange}
              />
              <Button className="btn btn-primary" onClick={handleAddTask}>
                Add
              </Button>
            </div>
          </div>
          <div>
            <h2>Tasks</h2>
            <div className="mt-3">
              <Row className="mb-3">
                <Col md={8}>
                  <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={handleSelectedDateChange}
                  />
                </Col>
                <Col md={4}>
                  <Button
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setSelectedDate("");
                      setStartDate("");
                      setEndDate("");
                      setIsTasksLoading(true);
                      fetchTasks();
                    }}
                  >
                    Show all tasks
                  </Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="form-select w-100"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </Col>
                <Col md={6}>
                  <Button
                    className="w-100"
                    onClick={() => {
                      filterByStatus();
                    }}
                  >
                    Filter by status
                  </Button>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={4}>
                  <select
                    id="field"
                    value={selectedField}
                    onChange={handleFieldChange}
                    className="form-select w-100"
                  >
                    <option value="title">По назві</option>
                    <option value="status">По статусу</option>
                  </select>
                </Col>
                <Col md={4}>
                  <select
                    id="sortOrder"
                    value={selectedSortOrder}
                    onChange={handleSortOrderChange}
                    className="form-select w-100"
                  >
                    <option value="asc">По зростанню</option>
                    <option value="desc">По спаданню</option>
                  </select>
                </Col>
                <Col md={4}>
                  <Button
                    className="w-100"
                    onClick={() => {
                      sortByKey();
                    }}
                  >
                    Sort by key
                  </Button>
                </Col>
              </Row>
              {isTasksLoading ? (
                <div className="mt-3">
                  <Loader />
                </div>
              ) : (
                <div className="mt-3">
                  <TaskList tasks={tasks.data} />
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
