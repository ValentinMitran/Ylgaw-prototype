import React, { useEffect, useState } from "react";

function Shop({ username }) {
  const [listings, setListings] = useState();
  const [isLoading, setIsLoading] = useState(true);
  async function getListings() {
    let response = await fetch("/api/profile/shop", {
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
    setListings(response);
    setIsLoading(false);
  }
  useEffect(() => {
    getListings();
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      {listings.map((listing) => (
        <div key="listing._id">
          {listing.title}
          <br />
          {listing.description}
          <br />
          {listing.price} <br />
          {listing.username}
          <br />
          <br />
        </div>
      ))}
    </>
  );
}

export default Shop;
