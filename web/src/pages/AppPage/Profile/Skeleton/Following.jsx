import React, { useEffect, useState } from "react";

function Following(props) {
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProfileFeed() {
    let response = await fetch("/api/profile/FollowingList", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      },
      body: JSON.stringify({
        username: props.username
      })
    });
    response = await response.json();
    setFollowingList(response);
    setLoading(false);
  }

  useEffect(() => {
    getProfileFeed();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>
        {followingList.map(user => (
          <div key={user._id} className="feedCard">
            <span>{user.username}</span>
            <br />
          </div>
        ))}
        {!followingList[0] ? <>No Followings</> : null}
      </h3>
    </div>
  );
}

export default Following;
