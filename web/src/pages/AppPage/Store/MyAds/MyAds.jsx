import React, { useEffect, useState } from "react";
import "./MyAds.scss";

function MyAds() {
  const [myAds, setMyAds] = useState([]);

  async function deleteAd(target) {
    alert(`Deleting ${target}`);
  }
  async function editAd(target) {
    alert("EDIT THIS AD MODAL BOX");
  }

  async function fetchListings() {
    let response = await fetch("/api/store/myads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
    }).catch((err) => {
      alert(err);
    });
    response = await response.json();
    setMyAds(response);
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      {myAds.map((myAd) => (
        <div key={myAd._id}>
          {myAd.title} | {myAd.description} | {myAd.price}&euro;{" "}
          <button onClick={() => editAd(myAd._id)}>Edit</button>
          <button onClick={() => deleteAd(myAd._id)}>Delete</button>
          <br />
        </div>
      ))}
    </div>
  );
}

export default MyAds;
