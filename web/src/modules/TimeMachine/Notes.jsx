import React, { useState, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";

function Notes(props) {
  const [editMode, setEditMode] = useState(false);
  const [note, setNote] = useState(props.text);
  useEffect(() => {}, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch("/api/timeMachine/note/update", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken,
      },
      body: JSON.stringify({
        text: note,
        date: props.date,
      }),
    }).catch((err) => {
      alert(err);
    });
    setEditMode(false);
  };

  if (editMode) {
    return (
      <>
        <div className="notes">
          <form onSubmit={submitHandler}>
            <textarea
              rows="4"
              cols="50"
              onChange={(e) => setNote(e.target.value)}
            >
              {note}
            </textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="notes">
        {note}
        <MdModeEdit onClick={() => setEditMode(true)} />
      </div>
    </>
  );
}

export default Notes;
