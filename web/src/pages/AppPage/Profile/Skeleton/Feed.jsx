import React, { useEffect, useState } from "react";

function Feed({ username }) {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getPosts() {
    let response = await fetch("/api/profile/feed", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
      body: JSON.stringify({
        target: username,
      }),
    }).catch((err) => {
      alert(err);
    });
    response = await response.json();
    setPosts(response);
    setIsLoading(false);
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      {posts.map((post) => (
        <div key="post._id">
          {post.username}
          <br />
          {post.content}
          <br /> <br />
        </div>
      ))}
    </>
  );
}

export default Feed;
