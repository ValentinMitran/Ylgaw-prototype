import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  Redirect,
  withRouter,
  useParams,
  useRouteMatch
} from "react-router-dom";
import "./Profile.scss";
import Feed from "./Skeleton/Feed";
import Following from "./Skeleton/Following";
import Followers from "./Skeleton/Followers";
import Shop from "./Skeleton/Shop";
const jwt = require("jsonwebtoken");

function Profile({ history }) {
  let { path, url } = useRouteMatch();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  let { username } = useParams();

  async function getProfileData() {
    const decodedjwt = jwt.decode(localStorage.authToken);
    let userExists = false;
    let target = await fetch("/api/profile/verifyUserName", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      },
      body: JSON.stringify({
        username: username
      })
    });
    if (target.ok) {
      target = await target.json();
      userExists = true;
    }

    if (!userExists) {
      history.push(`${decodedjwt.username}`);
    }

    let response = await fetch("/api/profile/getProfileData", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      },
      body: JSON.stringify({
        username: username
      })
    });
    response = await response.json();
    setProfile(response);
    setLoading(false);
  }

  useEffect(() => {
    getProfileData();
  }, [username]);

  if (loading) {
    return (
      <div>
        <div className="main">Loading...</div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="profileContainer">
        <div className="profileSide">
          <div className="profileData">
            <img
              src="https://www.pearsoncollege.ca/wp-content/uploads/2019/12/placeholder-profile.jpg"
              alt=""
            />
            <div className="profileName">
              {" "}
              <span className="username">@{profile.username}</span>{" "}
              <span> {profile.title}</span>
            </div>

            <div className="followsCounter">
              <Link to="/">
                {profile.following}
                <span> Following</span>
              </Link>
              <Link to="/">
                {" "}
                {profile.followers}
                <span> Followers</span>
              </Link>
            </div>
          </div>
          <nav>
            <Link to={`${url}/feed`}>Feed</Link>
            <Link to={`${url}/shop`}>Shop</Link>
            <Link to={`${url}/followers`}>Followers</Link>
            <Link to={`${url}/following`}>Following</Link>
          </nav>
        </div>
        <div className="profileMain">
          <Switch>
            <Route path={`${path}/feed`}>
              <Feed />
            </Route>
            <Route path={`${path}/shop`}>
              <Shop />
            </Route>
            <Route path={`${path}/followers`}>
              <Followers />
            </Route>
            <Route path={`${path}/following`}>
              <Following />
            </Route>
            <Route path={`${path}/`}>PROFILE PAGE</Route>
            <Route path="/*">
              <Redirect to={`${url}/`} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Profile);
