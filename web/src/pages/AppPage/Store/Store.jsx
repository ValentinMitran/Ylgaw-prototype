import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import "./Store.scss";
import NewAd from "./NewAd/NewAd";
import MyAds from "./MyAds/MyAds";
import Ad from "./Ad/Ad";
import { MdAdd, MdList, MdKeyboardReturn } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import ModalAd from "./ModalAd";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Store() {
  const classes = useStyles();

  let { path, url } = useRouteMatch();
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchAds() {
    let response = await fetch("/api/store/ads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
    });
    response = await response.json();
    setAds(response);
  }

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <>
      <div className="shopWrapper">
        <Switch>
          <Route exact path={path}>
            <div className="shopTitle">Baazar</div>
            <div className="shopNavBtn">
              <Link to={`${path}/add`}>
                <MdAdd />
              </Link>
              <Link to={`${path}/myads`}>
                <MdList />
              </Link>
            </div>
            <div className="adSearcher">
              <input
                id=""
                type="text"
                name="searchAds"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
            </div>
            <div className="listings">
              {ads.map((ad) => (
                <Card key={ad._id} className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {ad.title.split(" ").slice(0, 7).join(" ")}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {ad.description.split(" ").slice(0, 15).join(" ")}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {ad.price}&euro;
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Sold by: {ad.username}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ModalAd
                      title={ad.title}
                      description={ad.description}
                      price={ad.price}
                      username={ad.username}
                    />
                  </CardActions>
                </Card>
              ))}
            </div>
          </Route>
          <Route path={`${path}/add`}>
            <div className="shopTitle">Ad posting</div>
            <div className="shopNavBtn">
              <Link to={`${url}`}>
                <MdKeyboardReturn />
              </Link>
            </div>
            <NewAd />
          </Route>
          <Route path={`${path}/myads`}>
            <div className="shopTitle">My Ads</div>
            <div className="shopNavBtn">
              <Link to={`${url}`}>
                <MdKeyboardReturn />
              </Link>
            </div>
            <MyAds />
          </Route>
          <Route path={`${path}/ad/:adId`}>
            <div className="shopTitle">Ad Viewer</div>
            <div className="shopNavBtn">
              <Link to={`${url}`}>
                <MdKeyboardReturn />
              </Link>
            </div>
            <Ad />
          </Route>
          <Route path={`${path}/*`}>
            <Redirect to={path} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Store;
