import React from 'react'
import { Stage, Layer, Group, Rect, Circle, Text } from 'react-konva';
const EsdvNode = ({x,y,selected}) => {
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
        text="EsdvNode"
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

export default EsdvNode