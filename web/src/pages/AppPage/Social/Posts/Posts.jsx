import React, { useState, useEffect } from "react";
import "./Posts.scss";
import Follow from "./Follow";
import Unfollow from "./Unfollow";

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
      {posts.map((post, index) => (
        <div className="post" key={index}>
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
              {post.self === false ? (
                post.amFollowing === true ? (
                  <Unfollow
                    index={index}
                    posts={posts}
                    setPosts={setPosts}
                    username={post.username}
                  />
                ) : (
                  <Follow
                    index={index}
                    posts={posts}
                    setPosts={setPosts}
                    username={post.username}
                  />
                )
              ) : null}
            </div>
          </div>
          <div className="content">{post.content}</div>
        </div>
      ))}
    </>
  );
}

export default Posts;
