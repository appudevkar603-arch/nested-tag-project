import React, { useState } from "react";

const TagView = ({ node, onChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(node.name);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const addChild = () => {
    if (node.data) {
      node.children = [{ name: "New Child", data: "Data" }];
      delete node.data;
    } else {
      node.children.push({ name: "New Child", data: "Data" });
    }
    onChange();
  };

  const updateData = (e) => {
    node.data = e.target.value;
    onChange();
  };

  const handleNameClick = () => {
    setEditing(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      node.name = name;
      setEditing(false);
      onChange();
    }
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <div style={{ background: "#4e89c7", padding: 10, color: "white" }}>
        <button onClick={toggle}>{collapsed ? ">" : "v"}</button>

        {editing ? (
          <input
            value={name}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span onClick={handleNameClick} style={{ cursor: "pointer" }}>
            {node.name}
          </span>
        )}

        <button onClick={addChild} style={{ float: "right" }}>
          Add Child
        </button>
      </div>

      {!collapsed && (
        <div>
          {node.data && <input value={node.data} onChange={updateData} />}

          {node.children &&
            node.children.map((child, index) => (
              <TagView key={index} node={child} onChange={onChange} />
            ))}
        </div>
      )}
    </div>
  );
};

export default TagView;