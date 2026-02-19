import React from 'react'
import GridLayer from '../Component/Utils/GridLayer'

const width = window.innerWidth
const height = window.innerHeight
const scale = 1
const stagePos = {x:0, y:0}

const ViewPage = () => {
  return (
    <GridLayer  
    width={width}
    height={height}
    scale={scale}
    stagePos={stagePos}
    />
  )
}

export default ViewPage