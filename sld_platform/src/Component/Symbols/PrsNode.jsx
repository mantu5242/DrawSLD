import React from 'react'
import { Stage, Layer,Group, Rect, Circle, Text } from 'react-konva';
import Port from '../Port/Port';


const PrsNode = ({x,y,selected,onPortClick}) => {
  
  return (
     <Group x={x} y={y} draggable onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
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
        text="PRS"
        fill="black"
        fontSize={14}
        width={100}
        height={100}
        align="center"
        verticalAlign="middle"
      />
    </Group>
    // </div>
  )
}

export default PrsNode