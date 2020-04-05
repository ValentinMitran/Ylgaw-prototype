import React, { useEffect, useState } from "react";

function Stats({ username }) {
  const [stats, setStats] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getStats() {
    let response = await fetch("/api/profile/stats", {
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
    setStats(response);
    setIsLoading(false);
  }

  useEffect(() => {}, []);

  if (isLoading) {
    return <>Loading...</>;
  }
  return <>Stats Page</>;
}

export default Stats;
