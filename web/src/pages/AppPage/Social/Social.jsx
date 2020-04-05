import React, { useEffect, useState } from "react";
import "./Social.scss";
import Posts from "./Posts/Posts";
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
        authToken: localStorage.authToken,
      },
    });
    response = await response.json();
    setUsers(response);
  }

  async function follow(targetUsername) {
    await fetch("/api/profile/follow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
      body: JSON.stringify({
        username: targetUsername,
      }),
    });

    setUpdated(!updated);
  }

  async function unfollow(targetUsername) {
    await fetch("/api/profile/unfollow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
      body: JSON.stringify({
        username: targetUsername,
      }),
    });
    setUpdated(!updated);
  }

  useEffect(() => {
    fetchUsers();
  }, [updated]);

  return (
    <div>
      <div className="userSearch">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Posts />
    </div>
  );
}

export default Social;
