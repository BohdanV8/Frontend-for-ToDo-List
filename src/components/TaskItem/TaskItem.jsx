import React, { useState } from "react";
import styles from "./TaskItem.module.css";
import axios from "axios";
const TaskItem = ({ task }) => {
  const [selectedStatus, setSelectedStatus] = useState(task.status);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdateStatus = async() => {
    try {
      const response = await axios.put(
        `http://localhost:8080/tasks/updateStatus/${task.task_id}`,
        {
          new_status: selectedStatus
        }
      );
    } catch (error) {
      console.error("Помилка під час оновлення статусу завдання:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskItem}>
        <h4 className={styles.title}>{task.title}</h4>
        <p className={styles.deadline}>
          Deadline: {new Date(task.day).toLocaleDateString()}
        </p>
        {task.status && (
          <p className={styles.deadline}>Status: {task.status}</p>
        )}
        <div className={styles.status}>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleUpdateStatus} className="mx-2">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
