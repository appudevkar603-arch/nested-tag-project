import React, { useState, useEffect } from "react";
import TagView from "./TagView";
import axios from "axios";

const initialTree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        {
          name: "child1-child1",
          data: "c1-c1 Hello"
        },
        {
          name: "child1-child2",
          data: "c1-c2 JS"
        }
      ]
    },
    {
      name: "child2",
      data: "c2 World"
    }
  ]
};

function App() {

  const [tree, setTree] =
    useState(initialTree);

  const refresh = () => {
    setTree({ ...tree });
  };

  const exportTree = async () => {

    console.log(
      JSON.stringify(tree)
    );

    await axios.post(
      "http://localhost:8000/trees",
      tree
    );

    alert("Saved");
  };

  return (

    <div>

      <TagView
        node={tree}
        onChange={refresh}
      />

      <button onClick={exportTree}>
        Export
      </button>

    </div>

  );
}

export default App;