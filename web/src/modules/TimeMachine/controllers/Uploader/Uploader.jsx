import React, { useEffect, useContext } from "react";
import ActionContext from "../../ActionContext";

function Uploader(props) {
  const [action, setAction] = useContext(ActionContext);

  const handleImageUpload = async event => {
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
        "auth-token": localStorage.authToken
      },
      body: formData
    }).catch(err => {
      alert(err);
    });
    response = await response.text();
    alert(response);
    setAction(!action);
  };

  useEffect(() => {}, [props.date]);

  return (
    <form>
      <input type="file" name="daily" id="" onChange={handleImageUpload} />
    </form>
  );
}

export default Uploader;