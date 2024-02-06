import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../UI/Loader/Loader";
import RoomList from "../RoomList/RoomList";
const Home = () => {
  const isAuth = localStorage.getItem("isAuth");
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/rooms/getUsersRooms/${isAuth}`
      );
      setRooms(response.data.dataCr.concat(response.data.dataAdd));
      setIsLoading(false);
    } catch (error) {
      console.error("Помилка під час отримання кімнат:", error.message);
    }
  };
  useEffect(() => {
    fetchRooms();
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
        fetchRooms();
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
      {isLoading ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <div className="mt-5">
          <RoomList rooms={rooms} />
        </div>
      )}
    </div>
  );
};

export default Home;
