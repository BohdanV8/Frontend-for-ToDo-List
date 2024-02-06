import React from "react";
import styles from "./RoomItem.module.css";
import { useNavigate } from "react-router-dom";
const RoomItem = ({ room }) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth");
  return (
    <div className="container">
      <div
        className={styles.roomItem}
        onClick={() => {
          if (room.creator_id === isAuth) {
            navigate("/room");
          }
        }}
      >
        {room.name}
      </div>
    </div>
  );
};

export default RoomItem;
