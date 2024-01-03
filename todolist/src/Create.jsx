import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Create() {
  const [task, settask] = useState();
  const hanleadd = () => {
    window.location.reload();
    if (task.trim() !== "") {
      axios
        .post("http://localhost:3001/add", { task: task })
        .then((response) => {
          // Handle the response if needed
          console.log("Post request successful:", response.data);
        })
        .catch((error) => {
          // Handle errors if the POST request fails
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="createform">
      <input
        type="text"
        name=""
        id=""
        placeholder="Enter Task"
        onChange={(e) => settask(e.target.value)}
      />
      <button type="button" onClick={hanleadd}>
        Add
      </button>
    </div>
  );
}

export default Create;
