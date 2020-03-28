import React, { useEffect, useState } from "react";

function Followers(props) {
  const [followersList, setFollowersList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProfileFeed() {
    let response = await fetch("/api/profile/FollowersList", {
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
    setFollowersList(response);
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
        {followersList.map(user => (
          <div key={user._id} className="feedCard">
            <span>{user.username}</span> <br />
          </div>
        ))}

        {!followersList[0] ? <>No Followers</> : null}
      </h3>
    </div>
  );
}

export default Followers;
