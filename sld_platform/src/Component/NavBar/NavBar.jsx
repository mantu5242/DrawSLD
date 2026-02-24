import React, { useRef, useState } from 'react'
import './NavBar.css'
import Esyasoft_Holding from '../../assets/Esyasoft_Holding.png'
import { ConvertSematicToLayout } from '../Utils/ImportRealJson'
import Papa from 'papaparse';
import { LuArrowDownToLine, LuClipboardPen, LuImport, LuPalette, LuRedo, LuShare, LuShare2, LuUndo, LuZoomIn, LuZoomOut } from "react-icons/lu";
import ColorPalette from '../ColorPalette/ColorPalette'
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../Redux/UiSlice';
import { setDiagram } from '../../Redux/DiagramSlice';
import { updateArrowColor } from '../../Redux/DiagramSlice';
import { useNavigate } from 'react-router-dom';
import { ActionCreators  } from 'redux-undo';

const SCALE_BY = 1.05;


const NavBar = ({scale, setScale}) => {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.ui.mode);
  const selected = useSelector(state => state.selection);
  const isReadOnly = mode === 'view'
  const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const [showPalette, setShowPalette] = useState(false);
  const [edgeColor, setEdgeColor] = useState('#000000')

  const handleColor = () =>{
    if (selected?.type === "edge") {
      setShowPalette(prev => !prev);
    }
  }

  const handleEditToggle = () => {
    dispatch(setMode(isReadOnly ? 'edit':'view'))
  }

  const handleRedo = () => {
    if(!isReadOnly) dispatch(ActionCreators.redo());
  }
  const handleUndo = () => {
    if(!isReadOnly) dispatch(ActionCreators.undo());
  }

  const handleShare = () => {

  }

  const handleZoomIn = () => {
    setScale(prev => prev * SCALE_BY);
  };

  const handleZoomOut = () => {
    setScale(prev => prev / SCALE_BY);
  };


  const handleDownload = () => {
    const project = localStorage.getItem("sld-project");
    if(!project) return;
    try{
      const parseData = JSON.parse(project);
      const jsonString = JSON.stringify(parseData,null,2);
      const blob =  new Blob([jsonString],{type:'application/json'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = 'sld-diagram.json';
      document.body.appendChild(link);
      link.click()
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    catch(error){
      console.error('download error', error)
    }
  }
  const handleUploadIconClick = () => {
    fileInputRef.current.click();
  }

  const objectType = {
    1: "QPS",
    2: "OUTLETPIPE",
    3: "METER",
    4: "GB",
    5: "JOINT",
    6: "STREETREGULATOR",
    7: "REGULATOR",
    8: "CONSUMER",
    9: "FILLER",
    10: "REDUCER"
  }
  
  const convertTojson = (rows) => {
    const nodes = []
    const arrows = []
    const nodeMap = {}
    const adj = {}
    let counter = 0;
    let countArrow = 1;

    rows.forEach(row => {
      const objType = Number(row.obj_ref_id);
      if(objType !== 9 && objType >= -1){
        const nodeId = 'n' + row.id;
        const node = {
          id: nodeId,
          type: objectType[objType] || "unknown",
          x : 0,
          y : 0,
          width: 0,
          height: 0,
        };

        nodes.push(node);
        nodeMap[nodeId] = node;
        adj[nodeId] = [];
      }
    })
 

    rows.forEach(row => {
      // console.log(row)
      const objType = Number(row.obj_ref_id)
      if(objType !== 9){
        const parentId = "n" + row.parent_id;
        const childId = "n" + row.id;
        // console.log(parentId)
        if(adj[parentId] && nodeMap[childId]){
          adj[parentId].push(childId);
        }
      }
    })

    Object.entries(adj).forEach(([parent, children]) => {
      children.forEach(childId => {
        if(!nodeMap[parent] || !nodeMap[childId] ) return ;
        arrows.push({
          id: "a" + countArrow,
          start: {
            x : 0,
            y : 0,
            attachedTo: {
              nodeId : parent,
              side : "",
              index : 0
            }
          },
          end: {
            x : 0,
            y : 0, 
            attachedTo : {
              nodeId : childId,
              side: "",
              index: 0
            }
          },
          stroke: "#000",
          label: {
            text: "",
            t: 0.5,
            offset: { x: 0, y: 0 },
            visible: false,
            editing: false
          } 
        })
        countArrow++;
      })
    })

    return {nodes, arrows}
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // .csv

    // if(file){
    //   Papa.parse(file,{
    //     header:true,
    //     complete : (result) => {
    //       const rows = result.data;
    //       const realData = convertTojson(rows);
    //       // console.log(realData);
    //       // const parseData = JSON.parse(realData);
    //       const realDataJson =  ConvertSematicToLayout(realData);
    //       onImport(realDataJson);
    //     }
    //   })
    // }
    
    // .json

    // if(!file || file.type !== 'application/json') return;
    // const reader = new FileReader();
    // reader.onload = (event) => {
    //   console.log("inside the handlefilechange")
    //   try{
    //     const content = event.target.result;
        // const parseData = JSON.parse(content);
        // const realData =  ConvertSematicToLayout(parseData);
    //     onImport(realData);
    //   }
    //   catch(error){
    //     console.error("invalid JSON file", error);
    //   }
    // }

    // reader.onerror = () => {
    //   console.error("File reading failed")
    // }
    // reader.readAsText(file);

    if(!file) return;
    const reader =  new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;

      if(file.name.endsWith(".json")){
        const parseData = JSON.parse(content);
        dispatch(setDiagram(parseData));
        dispatch(setMode('view'));
      }

      if (file.name.endsWith(".csv")) {
        Papa.parse(file,{
        header:true,
        complete : (result) => {
          const rows = result.data;
          const realData = convertTojson(rows);
          // console.log(realData);
          // const parseData = JSON.parse(realData);
          const realDataJson =  ConvertSematicToLayout(realData);
          dispatch(setDiagram(realDataJson));
          dispatch(setMode("view"));
          navigate('/view')
          // dispatch(setMode("view"));
        }
      })
      }
    }

    reader.readAsText(file);

  }


  return (
    <div className='navbar-mainblock'>
        
      {/* <div sty> */}
        <img src={Esyasoft_Holding} alt='Esyasoft_Holding_logo' style={{ width:'5wh', height:'6vh', display:'flex', alignItems:'center'
        }}/>
        <div className='NavbarButtonDiv'>
          <div className='NavbarIconButton first' style={{position:'relative'}}>
            {!isReadOnly ? (
            <button className='navbarbutton icons' onClick={handleColor}><LuPalette style={{color:'rgba(0, 0, 0, 0.664) ', height:'5vh', width:'10wh'}}/></button>
            ) : (
              <button className='navbarbutton icons'><LuPalette style={{color:'rgba(87, 87, 87, 0.66) ', height:'5vh', width:'10wh'}}/></button>
            )}
            { showPalette && (
            <ColorPalette
              initialColor={
                selected?.type === "edge"
                  ? "#000000"
                  : "#000000"
              }
              onApply={(color) => {
                if (selected?.type === "edge") {
                  dispatch(updateArrowColor({
                    arrowId: selected.id,
                    color: color
                  }));
                }

                setEdgeColor(color);
                setShowPalette(false);
              }}
              onClose={() => setShowPalette(false)}
            />
          )}
          </div>
          <div className='NavbarIconButton first' >
            {!isReadOnly ? (
              <>
                <button className='navbarbutton icons' onClick={handleUndo}><LuUndo style={{color:'rgba(0, 0, 0, 0.664) ', height:'5vh', width:'10wh'}} /></button>
                <button className='navbarbutton icons' onClick={handleRedo}><LuRedo style={{color:'rgba(0, 0, 0, 0.664) ', height:'5vh', width:'10wh'}} /></button>
              </>
            ) : (
              <>
                <button className='navbarbutton icons' ><LuUndo style={{color:'rgba(87, 87, 87, 0.66) ', height:'5vh', width:'10wh'}} /></button>
                <button className='navbarbutton icons' ><LuRedo style={{color:'rgba(87, 87, 87, 0.66) ', height:'5vh', width:'10wh'}} /></button>
              </>
            )
          
          }
          </div>
          <div className='NavbarIconButton second' >
            <button className='navbarbutton icons' onClick={handleEditToggle} ><LuClipboardPen style={{color:'rgba(0, 0, 0, 0.664) ', height:'5vh', width:'10wh'}} /></button>
            <button className='navbarbutton icons' onClick={handleDownload}><LuArrowDownToLine style={{color:'rgba(0, 0, 0, 0.664) ', height:'5vh', width:'10wh'}} /></button>
            <button className='navbarbutton icons' onClick={handleUploadIconClick}>
              <LuImport style={{color:'rgba(0, 0, 0, 0.664) ', height:'5vh', width:'10wh'}} />
              <input type='file' ref={fileInputRef} style={{display:'none'}} accept='.csv' onChange={handleFileChange}/>
            </button>
            <button className='navbarbutton icons'> <LuShare2 style={{color:'rgba(0, 0, 0, 0.664) ', height:'5vh', width:'10wh'}} /> </button>
          </div>
          <div className='NavbarIconButton third  '>
            <div className='zoom-box'>
              <button className='navbarbutton icons' onClick={handleZoomIn}><LuZoomIn style={{color:'rgba(0, 0, 0, 0.664) ', height:'5vh', width:'10wh'}}/></button>
              <div className='zoom-percent-display'>{Math.round(scale * 100)}%</div>
              <button className='navbarbutton icons' onClick={handleZoomOut}><LuZoomOut style={{color:'rgba(0, 0, 0, 0.664) ', height:'5vh', width:'10wh'}}/></button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NavBar