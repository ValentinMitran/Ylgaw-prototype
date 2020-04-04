import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss";
import { MdPeople, MdApps, MdFileDownload } from "react-icons/md";

function LandingPage() {
  return (
    <div className="lp">
      <header>
        <div className="lpnav">
          <img src="https://i.imgur.com/JD1htQS.png" alt="" />
          <nav>
            <Link to="/login">Login</Link>
            <Link id="registerLink" to="/register">
              Register
            </Link>
          </nav>
        </div>
      </header>
      <div className="herotxt">
        <p>
          Improve yourself <span>with Ylgaw</span>
        </p>
        <Link to="/register">Get Started</Link>
      </div>
      <div className="hero">
        <img
          src="https://www.100hdwallpapers.com/wallpapers/3000x1875/alone_moon_silhouette-other.jpg"
          alt=""
        />
      </div>
      <div className="stats">
        <div className="stat">
          <MdPeople />
          <span>Users</span>
          1.29k
        </div>
        <div className="stat">
          <MdApps />
          <span>Modules</span>6
        </div>
        <div className="stat">
          <MdFileDownload />
          <span>Downloads</span>
          1.29k
        </div>
      </div>
      <div className="lpcontainer">
        <div className="modules">
          <div className="module">
            <img
              src="https://icons.iconarchive.com/icons/johanchalibert/mac-osx-yosemite/512/timemachine-icon.png"
              alt=""
            />
            <span>Time Machine</span>
            Your daily diary. Write what's on your mind and upload a photo of
            yourself so you can remember how you used to look and think like in
            the future.
          </div>
          <div className="module">
            <img
              src="https://i.ya-webdesign.com/images/stopwatch-transparent-flat-2.png"
              alt=""
            />
            <span>Pomodoro</span>
            Your focus timer. If you need a quickstart or just track your focus
            time this is for you
          </div>
          <div className="module">
            <img
              src="https://i.pinimg.com/originals/cf/ee/64/cfee6447285f1030c053e88cedf676f6.png"
              alt=""
            />
            <span>NapChart</span>
            Your sleep scheduler. Plan and track your sleep and wake time
          </div>
          <div className="module">
            <img
              src="https://cdn4.iconfinder.com/data/icons/business-people-set-4/64/people-network-social-business-connection-community-networking-communication-512.png"
              alt=""
            />
            <span>Social Features</span>
            Post your thoughts, see what other users are doing and interact
          </div>
          <div className="module">
            <img
              src="https://image.flaticon.com/icons/png/512/1803/1803330.png"
              alt=""
            />
            <span>Marketplace</span>
            If you want to hire a coach, buy an ebook or anything digital this
            is what you need
          </div>
          <div className="module">
            <img
              src="https://www.dlf.pt/png/big/9/95534_more-icon-png.png"
              alt=""
            />
            <span>Much more...</span>
            Join us and check all the features by yourself
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
