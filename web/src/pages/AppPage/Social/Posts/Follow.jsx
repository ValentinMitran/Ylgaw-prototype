import React from "react";

function Follow(props) {
  async function follow() {
    await fetch("/api/profile/follow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
      body: JSON.stringify({
        username: props.username,
      }),
    });
    let newArr = [...props.posts];
    newArr[props.index].amFollowing = true;
    props.setPosts(newArr);
  }
  return (
    <>
      <button id="followAction" onClick={() => follow()}>
        Follow
      </button>
    </>
  );
}

export default Follow;
