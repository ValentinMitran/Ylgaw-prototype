import React, { useState, useEffect } from "react";
import "./Posts.scss";

function Posts() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    let response = await fetch("/api/social/posts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
    });
    response = await response.json();
    setPosts(response);
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <div className="pheader">
            <div className="pfp">
              {!post.pfp ? (
                <img
                  src="https://www.awesomecreative.co.uk/wp-content/uploads/2018/07/placeholder-profile.jpg"
                  alt="Profile"
                />
              ) : (
                <img src={`data:image/png;base64,${post.pfp}`} alt="Profile" />
              )}
            </div>

            <div className="pfn">
              <span>{post.username}</span>@{post.username}
            </div>
            <div className="follow">
              <button>{post.following ? "Unfollow" : "Follow"}</button>
            </div>
          </div>
          <div className="content">{post.content}</div>
        </div>
      ))}
    </>
  );
}

export default Posts;
