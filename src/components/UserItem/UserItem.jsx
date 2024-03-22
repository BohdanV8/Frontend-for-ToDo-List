import React from "react";
import styles from "./UserItem.module.css";
import axios from "axios";
const UserItem = ({ user, setUsers, users }) => {
  const roomId = localStorage.getItem("roomId");
  const deleteUserById = (users, userIdToDelete) => {
    const updatedUsers = users.filter((user) => user.id !== userIdToDelete);
    return updatedUsers;
  };
  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/rooms/deleteUser/${roomId}/${user.id}`
      );
      const updateUsers = deleteUserById(users, user.id);
      setUsers(updateUsers);
    } catch (error) {
      console.error("Error updating task status:", error.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <h2 className={styles.username}>{user.username}</h2>
        <p className={styles.email}>{user.email}</p>
        <button className={styles.deleteButton} onClick={handleDeleteUser}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;
