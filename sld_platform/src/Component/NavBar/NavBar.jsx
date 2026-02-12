import React, { useRef } from 'react'
import './NavBar.css'
import Esyasoft_Holding from '../../assets/Esyasoft_Holding.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFileUpload, faFloppyDisk, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { ConvertSematicToLayout } from '../Utils/ImportRealJson'
import Papa from 'papaparse';


const NavBar = ({stageRef, onImport}) => {
  const fileInputRef = useRef(null);

  const handleRedo = () => {
    redo();
  }
  const handleUndo = () => {
    undo();
  }
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







  // read csv and convert to json {nodes:[], arrows:[]}
  const objectType = {
    1: "QPS",
    2: "OUTLETPIPE",
    3: "METER",
    4: "GB",
    5: "JOINTS",
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
    let countArrow = 1;

    // Object.keys(adj).forEach(nodeId => {
    //   adj[nodeId] = [];
    // })

    rows.forEach(row => {
      const objType = Number(row.obj_ref_id);
      // const parentId = "n" + row.parent;
      // const child = "n" + row.id;
      // adj[parentId].push(child);
      // console.log(row)
      if(objType !== 9){
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
    console.log(nodes)

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

    // console.log(adj)
    // console.log(nodeMap)


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
    if(file){
      Papa.parse(file,{
        header:true,
        complete : (result) => {
          const rows = result.data;
          const {nodes,arrows} = convertTojson(rows);
          console.log({nodes,arrows});
        }
      })
    }
    // if(!file || file.type !== 'application/json') return;
    // const reader = new FileReader();
    // reader.onload = (event) => {
    //   console.log("inside the handlefilechange")
    //   try{
    //     const content = event.target.result;
    //     const parseData = JSON.parse(content);
    //     const realData =  ConvertSematicToLayout(parseData);
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
  }


  return (
    <div style={{width: '100wh', height: '8vh', backgroundColor:'#010147', borderBottomWidth:'3px', borderColor:'#07075d', display:'flex',alignItems:'center', paddingLeft:'10px', paddingRight:'10px', justifyContent:'space-between'}}>
        
        {/* <div sty> */}
          <img src={Esyasoft_Holding} alt='Esyasoft_Holding_logo' style={{ width:'7wh', height:'5vh'}}/>
          <div style={{display:'flex', gap:'20px'}}>
           <FontAwesomeIcon className='icons' icon={faRotateLeft}  onClick={handleUndo} />
           <FontAwesomeIcon className='icons' icon={faRotateRight} onClick={handleRedo}/>
           {/* <FontAwesomeIcon className='icons' icon={faFloppyDisk} onClick={handleSave}/> */}
           <FontAwesomeIcon className='icons' icon={faDownload} onClick={handleDownload}/>
           <div style={{display:'flex', cursor:'pointer',}} onClick={handleUploadIconClick}>
            <FontAwesomeIcon className='icons' icon={faFileUpload} />
            <input type='file' ref={fileInputRef} style={{display:'none'}} accept='.csv' onChange={handleFileChange}/>
           </div>

          </div>
        {/* </div> */}
    </div>
  )
}

export default NavBar