import React, { useEffect, useState } from "react";

function WritePost() {
  const [post, setPost] = useState("");
  const savePost = async (e) => {
    e.preventDefault();
    await fetch("/api/social/posts", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
      body: JSON.stringify({
        content: post,
      }),
    }).catch((err) => {
      alert(err);
    });
    setPost("");
  };
  return (
    <>
      <div className="postWriter">
        <span> Share your thoughts</span>

        <form onSubmit={savePost}>
          <input
            type="text"
            name=""
            id=""
            placeholder="What's on your mind?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default WritePost;
