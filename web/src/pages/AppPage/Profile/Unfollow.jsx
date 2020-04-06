import React from "react";

function Unfollow(props) {
  async function unfollow() {
    await fetch("/api/profile/unfollow", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
      body: JSON.stringify({
        username: props.username,
      }),
    });
    props.setFollowing(false);
  }

  return (
    <>
      <button id="followAction" onClick={() => unfollow()}>
        UnFollow
      </button>
    </>
  );
}

export default Unfollow;
