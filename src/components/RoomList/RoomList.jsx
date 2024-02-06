import React from "react";
import RoomItem from "../RoomItem/RoomItem";
const RoomList = ({ rooms }) => {
  return (
    <div>
      {rooms.map((room) => {
        return <RoomItem key={room.room_id} room={room} />;
      })}
    </div>
  );
};

export default RoomList;
