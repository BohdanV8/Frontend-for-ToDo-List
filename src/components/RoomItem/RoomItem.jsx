import React from "react";
import styles from "./RoomItem.module.css";
import { useNavigate } from "react-router-dom";
const RoomItem = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div
        className={styles.roomItem}
        onClick={() => {
          localStorage.setItem("roomId", room.id);
          navigate("/userRoom");
        }}
      >
        {room.name}
      </div>
    </div>
  );
};

export default RoomItem;
