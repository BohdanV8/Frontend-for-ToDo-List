import React, { useMemo, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context";
import RoomItem from "../RoomItem/RoomItem";
const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const rooms = useMemo(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/rooms/getUsersRooms/${isAuth}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error during getting rooms:", error.message);
    }
  }, []);
  const [roomTitle, setRoomTitle] = useState("");
  const handleInputChange = (e) => {
    setRoomTitle(e.target.value);
  };
  const addRoom = async () => {
    if (roomTitle) {
      try {
        const response = await axios.post(
          "http://localhost:8080/rooms/createRoom",
          {
            roomName: roomTitle,
            creatorId: isAuth,
          }
        );
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
      <div className="mt-5">
        <RoomItem />
      </div>
    </div>
  );
};

export default Home;
