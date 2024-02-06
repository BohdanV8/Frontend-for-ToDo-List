import React from "react";
import RoomItem from "../RoomItem/RoomItem";
const RoomList = ({ rooms }) => {
  return (
    <div className="row">
      {rooms.map((room) => {
        return (
          <div className="col-md-6 col-lg-4 mt-2" key={room.room_id}>
            <RoomItem room={room} />
          </div>
        );
      })}
    </div>
  );
};

export default RoomList;
