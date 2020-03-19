import React, { useEffect, useState } from "react";

function Uploader() {
  const handleImageUpload = async event => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append("username", "mrx");

    formData.append("daily", files[0]);
    let response = await fetch("/api/timeMachine/upload", {
      method: "POST",
      headers: {
        "auth-token": localStorage.authToken
      },
      body: formData
    }).catch(err => {
      alert(err);
    });
    response = await response.text();
    alert(response);
  };

  useEffect(() => {}, []);

  return (
    <form>
      <input type="file" name="daily" id="" onChange={handleImageUpload} />
    </form>
  );
}

export default Uploader;