import React, { useEffect, useState } from "react";
const jwt = require("jsonwebtoken");

function Uploader() {
  const [decodedjwt, setDecodedjwt] = useState(
    jwt.decode(localStorage.authToken)
  );
  const handleImageUpload = async event => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append("username", decodedjwt.username);

    formData.append("pfp", files[0]);
    let response = await fetch("/api/profile/pfp", {
      method: "POST",
      headers: {
        authToken: localStorage.authToken
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
      <input type="file" name="pfp" id="" onChange={handleImageUpload} />
    </form>
  );
}

export default Uploader;
