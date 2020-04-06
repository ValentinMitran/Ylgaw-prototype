import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const jwt = require("jsonwebtoken");

function Uploader() {
  const [decodedjwt] = useState(jwt.decode(localStorage.authToken));
  const notify = () => toast.success("Profile picture changed successfully!");
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append("username", decodedjwt.username);

    formData.append("pfp", files[0]);
    await fetch("/api/profile/pfp", {
      method: "POST",
      headers: {
        authToken: localStorage.authToken,
      },
      body: formData,
    }).catch((err) => {
      alert(err);
    });
    notify();
  };

  useEffect(() => {}, []);

  return (
    <form>
      <input type="file" name="pfp" id="" onChange={handleImageUpload} />
    </form>
  );
}

export default Uploader;
