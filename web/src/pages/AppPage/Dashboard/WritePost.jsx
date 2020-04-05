import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
function WritePost() {
  const [post, setPost] = useState("");
  const notify = () => toast.success("Posted successfully!");
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
    notify();
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
