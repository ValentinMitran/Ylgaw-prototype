import React, { useEffect, useState } from "react";

function Uploader(){
    const [file, setFile] = useState(false);

    const submitForm = async e => {
      e.preventDefault();
    };
  
    useEffect(() => {}, []);

    return(


        <form onSubmit={submitForm}>
          <input type="file" name="file" id="" onChange={() => setFile(true)} />
          <button type="submit" disabled={!file}>
            Submit
          </button>
        </form>
    );
}

export default Uploader;