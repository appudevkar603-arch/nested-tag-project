import React, { useState, useEffect } from "react";
import TagView from "./TagView";
import axios from "axios";

const initialTree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" }
      ]
    },
    { name: "child2", data: "c2 World" }
  ]
};

function App() {
  const [trees, setTrees] = useState([]);
  const [jsonOutput, setJsonOutput] = useState("");
  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/trees");

      if (res.data.length === 0) {
        // If DB empty → use default tree
        setTrees([{ id: null, data: initialTree }]);
      } else {
        setTrees(res.data);
      }

    } catch (error) {
      console.log(error);
      setTrees([{ id: null, data: initialTree }]);
    }
  };

  const updateTree = (index, newTree) => {
    const updated = [...trees];
    updated[index].data = newTree;
    setTrees(updated);
  };

  const exportTree = async (tree, id) => {
    // convert to JSON string
    const jsonString = JSON.stringify(tree, null, 2);

    // show on UI
    setJsonOutput(jsonString);

    if (id) {
      await axios.put(`http://127.0.0.1:8000/trees/${id}`, tree);
    } else {
      await axios.post("http://127.0.0.1:8000/trees", tree);
    }

    alert("Saved!");
    fetchTrees();
  };

  return (
    <div>
      {trees.map((t, index) => (
        <div key={index}>
          <TagView
            node={t.data}
            onChange={() => updateTree(index, t.data)}
          />
          <button onClick={() => exportTree(t.data, t.id)}>
            Export
          </button>
          <pre style={{ background: "#eee", padding: "10px", marginTop: "10px" }}>
            {jsonOutput}
          </pre>
        </div>
      ))}
    </div>
  );
}

export default App;