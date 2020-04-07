import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
const jwt = require("jsonwebtoken");

function Uploader({ history }) {
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
    history.push(`/u/${decodedjwt.username}`);
  };

  useEffect(() => {}, []);

  return (
    <form>
      <input type="file" name="pfp" id="" onChange={handleImageUpload} />
    </form>
  );
}

export default withRouter(Uploader);
