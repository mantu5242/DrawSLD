import { useState } from "react";


let nodeCount = 0;

export const UseNodes = () => {
  const [nodes, setNodes] = useState([]);

  const addNode = (type) => {
    setNodes(prev => [
      ...prev,
      {
        id: `n${nodeCount++}`,
        type,
        x: 200,
        y: 100,
        width: 100,
        height: 100
      }
    ]);
  };

  const updateNode = (id, x, y) => {
    setNodes(prev =>
      prev.map(n => n.id === id ? { ...n, x, y } : n)
    );
    
    // syncArrowsWithNode({ id, x, y, width, height });

  };

  const resizeNode = (id, x, y, width, height) => {
    setNodes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, x, y, width, height } : n
      )
    );
    // syncArrowsWithNode({ id, x, y, width: w, height: h });
  };
    // const updateNode = (id, x, y) => {
    //     setNodes(...);
    //     syncArrowsWithNode({ id, x, y, width, height });
    //     };

    // const resizeNode = (id, x, y, w, h) => {
    // setNodes(...);
    // syncArrowsWithNode({ id, x, y, width: w, height: h });
    // };

  const removeNode = (id) => {
    setNodes(prev => prev.filter(n => n.id !== id));
  };

  return { nodes, addNode, updateNode, resizeNode, removeNode };
};
