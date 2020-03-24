import React from "react";
import { Link, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import "./Profile.scss";

function Profile() {
  let { path, url } = useRouteMatch();
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
              <span className="username">@username</span>{" "}
              <span> "The One And Only"</span>
            </div>

            <div className="followsCounter">
              <Link to="/">
                5<span> Following</span>
              </Link>
              <Link to="/">
                {" "}
                10<span> Followers</span>
              </Link>
            </div>
          </div>
          <nav>
            <Link to={`${url}/link1`}>Link1</Link>
            <Link to={`${url}/link2`}>Link2</Link>
            <Link to={`${url}/link3`}>Link3</Link>
            <Link to={`${url}/link4`}>Link4</Link>
            <Link to={`${url}/link5`}>Link5</Link>
          </nav>
        </div>
        <div className="profileMain">
          <Switch>
            <Route exact path={`${path}/`}>
              PROFILE PAGE
            </Route>
            <Route path={`${path}/link1`}>LINK1</Route>
            <Route path={`${path}/link2`}>LINK2</Route>
            <Route path={`${path}/link3`}>LINK3</Route>
            <Route path={`${path}/link4`}>LINK4</Route>
            <Route path={`${path}/link5`}>LINK5</Route>

            <Route path="/*">
              <Redirect to={`${url}/`} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Profile;