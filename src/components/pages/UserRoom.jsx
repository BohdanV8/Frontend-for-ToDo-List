import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const UserRoom = () => {
  const [date, setDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAddRoom = () => {};
  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
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
              onChange={handleInputChange}
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
          <Button onClick={handleAddRoom} className="w-100">
            Add task
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRoom;
