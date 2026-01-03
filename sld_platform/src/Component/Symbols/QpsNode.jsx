import React from 'react'
import { Group, Rect, Text, Circle } from "react-konva";



const QpsNode = ({ x,y, selected }) => {
  return (
    <Group x={x} y={y}>
      <Rect
        width={120}
        height={50}
        fill="#0f172a"
        cornerRadius={6}
        stroke={selected ? "#38bdf8" : "#334155"}
        strokeWidth={2}
      />
      <Text
        text="QPS"
        fill="white"
        fontSize={14}
        x={40}
        y={15}
      />
      {/* Ports */}
      <Circle x={0} y={25} radius={4} fill="green" />
      <Circle x={120} y={25} radius={4} fill="red" />
    </Group>
  );
}

export default QpsNode


// import React from 'react'

// const qpsNode = () => {
//   return (
//     <div>qpsNode</div>
//   )
// }

// export default qpsNode