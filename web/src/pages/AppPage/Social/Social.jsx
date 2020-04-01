import React, { useEffect, useState } from "react";
import "./Social.scss";
const jwt = require("jsonwebtoken");

function Social() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [updated, setUpdated] = useState(false);
  async function fetchUsers() {
    let response = await fetch("/api/social/usersList", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      }
    });
    response = await response.json();
    setUsers(response);
  }

  async function follow(targetUsername) {
    await fetch("/api/profile/follow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      },
      body: JSON.stringify({
        username: targetUsername
      })
    });

    setUpdated(!updated);
  }

  async function unfollow(targetUsername) {
    await fetch("/api/profile/unfollow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      },
      body: JSON.stringify({
        username: targetUsername
      })
    });
    setUpdated(!updated);
  }

  useEffect(() => {
    fetchUsers();
  }, [updated]);

  return (
    <div>
      {users.map(user => (
        <div key={user._id} className="socialCard">
          <img
            className="profilePicture"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <div className="userInfo">
            <span> {user.username}</span>
            <br />

            <button
              onClick={() =>
                user.following ? unfollow(user.username) : follow(user.username)
              }
            >
              {user.following ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Social;
