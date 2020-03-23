import React, { useEffect, useContext } from "react";
import "./Remover.scss";

import ActionContext from "../../ActionContext";

function Remover(props) {
  const [action, setAction] = useContext(ActionContext);

  async function removeImg() {
    let response = await fetch("/api/timeMachine/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.authToken
      },
      body: JSON.stringify({
        date: props.date,
        month: props.month,
        year: props.year
      })
    }).catch(err => {
      alert(err);
    });
    response = await response.text();
    alert(response);
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