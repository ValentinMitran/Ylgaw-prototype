import React, { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "./Remover.scss";

import ActionContext from "../../ActionContext";

function Remover(props) {
  const [action, setAction] = useContext(ActionContext);
  const notify = () => toast.success("Image removed successfully!");

  async function removeImg() {
    let response = await fetch("/api/timeMachine/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
      body: JSON.stringify({
        date: props.date,
        month: props.month,
        year: props.year,
      }),
    }).catch((err) => {
      alert(err);
    });
    response = await response.text();
    notify();
    setAction(!action);
  }

  useEffect(() => {}, []);
  return (
    <>
      <div className="remover">
        <button onClick={() => removeImg()}>Remover</button>
      </div>
    </>
  );
}

export default Remover;
