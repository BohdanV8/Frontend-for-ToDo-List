import React from "react";
import UserItem from "../UserItem/UserItem";
const UserList = ({ users, setUsers }) => {
  return (
    <div className="row">
      {users.map((user) => {
        return (
          <div className="col-md-6 col-lg-4 mt-2" key={user.id}>
            <UserItem user={user} users={users} setUsers={setUsers} />
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
