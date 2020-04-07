import React, { useEffect, useState } from "react";
import "./Social.scss";
import Posts from "./Posts/Posts";

function Social() {
  const [search, setSearch] = useState("");
  useEffect(() => {}, []);

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
