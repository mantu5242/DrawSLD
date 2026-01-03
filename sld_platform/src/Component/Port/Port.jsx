import React from 'react'
import { Circle } from 'react-konva'

const Port = ({x,y,type,visible,onMouseDown}) => {
  return (
    <Circle
      x={x}
      y={y}
      radius={5}
      fill={type === "in" ? "green" : "blue"}
      onMouseDown={onMouseDown}
    />
  )
}

export default Port