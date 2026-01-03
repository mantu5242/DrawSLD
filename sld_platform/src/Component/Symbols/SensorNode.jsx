import React from 'react'
import { Stage, Layer, Rect, Circle, Text, Group } from 'react-konva';
const SensorNode = ({x,y,selected}) => {
  return (
    <Group x={x} y={y} draggable>
      <Rect
        width={100}
        height={100}
        fill="white"
        stroke="black"
        strokeWidth={2}
        cornerRadius={8}
        // shadowBlur={10}
      />

      <Text
        text="SensorNode"
        fill="black"
        fontSize={14}
        width={100}
        height={100}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  )
}

export default SensorNode