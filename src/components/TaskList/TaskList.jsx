import React, { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
const TaskList = ({ tasks }) => {
  return (
    <div className="row">
      {tasks.map((task) => {
        return (
          <div className="col-md-6 col-lg-4 mt-2" key={task.task_id}>
            <TaskItem task={task} />
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
