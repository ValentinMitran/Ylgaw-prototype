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
              <img
                src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTU1MDM5NjczOF5BMl5BanBnXkFtZTcwOTY2MDE4OA@@._V1_UY256_CR0,0,172,256_AL_.jpg"
                alt=""
              />
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
