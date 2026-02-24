import { useEffect } from 'react';
import SldStage from '../Component/SldUtils/SldStage'
import { setMode } from '../Redux/UiSlice'
import { useDispatch } from 'react-redux'

const ViewPage = ({scale, setScale, stageRef}) => {
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch(setMode('view'));
    return () => {
      dispatch(setMode('edit'));
    }
  },[dispatch])
  return (
    <SldStage scale={scale} setScale={setScale} stageRef={stageRef}/>
  )
}

export default ViewPage