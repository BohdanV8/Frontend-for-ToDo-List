import React from "react";
import styles from "./TaskItem.module.css";
const TaskItem = ({ task }) => {
  return (
    <div className="container">
      <div className={styles.taskItem}>{task.title}</div>
    </div>
  );
};

export default TaskItem;
