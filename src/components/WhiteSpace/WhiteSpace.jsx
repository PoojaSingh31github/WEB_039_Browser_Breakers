import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { ExportButton } from "../ExportButton/ExportButton";
import ColorModeFlow from "../ColorMode/ColorModeFlow";
import {
  CircleNode,
  DiamondNode,
  ParallelogramNode,
  RectangleNode,
  SquareNode,
} from "../Another/Shape";
// import Sidebar from "../Sidebar/Sidebar.jsx";

// const initialEdges = [];
// const initialNodes = [];

const nodeTypes = {
  rectangle: RectangleNode,
  parallelogram: ParallelogramNode,
  circle: CircleNode,
  square: SquareNode,
  diamond: DiamondNode,
};

const WhiteSpace = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(JSON.parse(localStorage.getItem("WhiteSpaceNodes")) || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(JSON.parse(localStorage.getItem("WhiteSpaceEdges")) || []);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  const [colorMode, setColorMode] = useState("dark");

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const newEdges = addEdge(
          {
            ...params,
            type: "smoothstep",
            markerEnd: { width: 10, height: 10, color: "#3470e4" },
            style: { strokeWidth: 2, stroke: "#3470e4" },
          },
          eds
        );
        updateLocalStorage(nodes, newEdges);
        return newEdges;
      });
    },
    [nodes]
  );

  const addNode = (shapeType) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `${nodes.length + 1}` },
      type: shapeType,
    };
    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    updateLocalStorage(updatedNodes, edges);
  };

  const updateLocalStorage = (updatedNodes, updatedEdges) => {
    localStorage.setItem("WhiteSpaceNodes", JSON.stringify(updatedNodes));
    localStorage.setItem("WhiteSpaceEdges", JSON.stringify(updatedEdges));
  };

  const deleteNode = () => {
    setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNodeId && edge.target !== selectedNodeId
      )
    );
    setNodes(updatedNodes);
    setEdges(updatedEdges);
    updateLocalStorage(updatedNodes, updatedEdges);
    setSelectedNodeId(null);
  };

  const handleLabelChange = (event) => {
    setNewLabel(event.target.value);
  };

  const applyLabelChange = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
    setNodes(updatedNodes);
    updateLocalStorage(updatedNodes, edges);
    setNewLabel("");
    setSelectedNodeId(null);
  };

  return (
    <div className="flex h-screen pt-32 pb-40 bg-[#F9E6CF]">

<div className="w-full md:w-1/5 p-4 bg-[#F9E6CF] text-gray-800 ">
<h2 className="text-2xl text-center text-[#a33669] font-bold mb-4">Tools</h2>
      <ExportButton elementId="whiteBoard" />
      <button
        className="flex items-center  justify-center md:w-full mt-5 py-2 mb-2 bg-[#FAC67A] rounded hover:bg-[#d6a55c]"
        onClick={() => addNode("rectangle")}
      >
        <i className="fas fa-border-all"></i>
        <span className="hidden md:inline ml-2">Add Rectangle</span>
      </button>

      <button
        className="flex items-center justify-center md:w-full py-2 mb-2 bg-[#FAC67A] rounded hover:bg-[#d6a55c]"
        onClick={() => addNode("parallelogram")}
      >
        <i className="fas fa-draw-polygon"></i>
        <span className="hidden md:inline ml-2">Add Parallelogram</span>
      </button>

      <button
        className="flex items-center justify-center md:w-full py-2 mb-2 bg-[#FAC67A] rounded hover:bg-[#d6a55c]"
        onClick={() => addNode("circle")}
      >
        <i className="fas fa-circle"></i>
        <span className="hidden md:inline ml-2">Add Circle</span>
      </button>

      <button
        className="flex items-center justify-center md:w-full py-2 mb-2 bg-[#FAC67A] rounded hover:bg-[#d6a55c]"
        onClick={() => addNode("square")}
      >
        <i className="fas fa-square"></i>
        <span className="hidden md:inline ml-2">Add Square</span>
      </button>

      <button
        className="flex items-center justify-center md:w-full py-2 mb-2 bg-[#FAC67A] rounded hover:bg-[#d6a55c]"
        onClick={() => addNode("diamond")}
      >
        <i className="fas fa-gem"></i>
        <span className="hidden md:inline ml-2">Add Diamond</span>
      </button>

      {selectedNodeId && (
        <>
          <button
            className="flex items-center justify-center md:w-full py-2 mb-2 bg-[#7c294f] rounded hover:bg-[#5d223c]"
            onClick={deleteNode}
          >
            <i className="fas fa-trash-alt"></i>
            <span className="hidden md:inline ml-2">Delete Node</span>
          </button>
          <input
            className="block md:w-full p-2 mb-2 border rounded text-gray-900"
            type="text"
            value={newLabel}
            onChange={handleLabelChange}
            placeholder="New Label"
          />
          <button
            className="flex items-center justify-center md:w-full py-2 bg-[#7c294f] rounded hover:bg-[#5d223c]"
            onClick={applyLabelChange}
          >
            <i className="fas fa-edit"></i>
            <span className="hidden md:inline ml-2">Change Label</span>
          </button>
        </>
      )}
    </div>
    <div
      id="whiteBoard"
      className={`flex-1 h-[80vh]  border ${colorMode === "dark" ? "bg-gray-900" : "bg-[#f8d5a1]"} `}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        nodeTypes={nodeTypes}
      >
        
        <ColorModeFlow colorMode={colorMode} setColorMode={setColorMode} />
        <Controls />
        <MiniMap
          style={{ backgroundColor: colorMode === "dark" ? "#333" : "gray" }}
        />
        <Background />
      </ReactFlow>
    </div>
  </div>
  );
};

export default WhiteSpace;
