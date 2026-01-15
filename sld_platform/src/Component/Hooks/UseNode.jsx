import { useEffect, useState, useRef } from "react";

// let nodeCount = 0;

export const UseNodes = () => {
  const [nodes, setNodes] = useState(() => {
    const saved = localStorage.getItem("sld-project");
    return saved ? JSON.parse(saved).nodes || [] : [];
  });

 const nodeCountRef = useRef(
    nodes.length > 0
      ? Math.max(...nodes.map(n => parseInt(n.id.slice(1)))) + 1
      : 0
  );
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sld-project") || "{}");
    localStorage.setItem(
      "sld-project",
      JSON.stringify({ ...saved, nodes })
    );
  }, [nodes]);

  const Node_def = {
    PRS : {width:80, height: 60},
    QPS : {width: 100, height: 80},
    ESDV : {width: 60, height: 30},
    CONSUMER: {width: 70, height: 60},
    BRANCH: {radius: 20},
    VALVE: {width:60, height: 30},
    SENSOR: {width:60, height: 30}
  }

  const addNode = (type) => {
    const def = Node_def[type];
    setNodes(prev => [
      ...prev,
      {
        id: `n${nodeCountRef.current++}`,
        type,
        x: 200,
        y: 100,
        ...def
      }
    ]);
  };

  const updateNode = (id, x, y) => {
    setNodes(prev =>
      prev.map(n => n.id === id ? { ...n, x, y } : n)
    );
    // console.log("position of the node",x, y)

  };

  const resizeNode = (id, x, y, width, height, radius) => {
    setNodes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, x, y, width, height, radius } : n
      )
    );
  };

  const removeNode = (id) => {
    setNodes(prev => prev.filter(n => n.id !== id));
  };

  return { nodes, addNode, updateNode, resizeNode, removeNode };
};
