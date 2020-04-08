import React, { useEffect, useContext } from "react";
import ActionContext from "../../ActionContext";
import { toast } from "react-toastify";
import "./Uploader.scss";

function Uploader(props) {
  const [action, setAction] = useContext(ActionContext);
  const notify = () => toast.success("Image uploaded successfully!");

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append("username", props.username);
    formData.append("date", props.date);
    formData.append("month", props.month);
    formData.append("year", props.year);

    formData.append("daily", files[0]);
    let response = await fetch("/api/timeMachine/upload", {
      method: "POST",
      headers: {
        authToken: localStorage.authToken,
      },
      body: formData,
    }).catch((err) => {
      alert(err);
    });
    response = await response.text();
    notify();
    setAction(!action);
  };

  useEffect(() => {}, [props.date]);

  return (
    <div id="uploader">
      <form>
        <input type="file" name="daily" id="" onChange={handleImageUpload} />
      </form>
    </div>
  );
}

export default Uploader;
