import React, { useRef } from 'react'
import './NavBar.css'
import Esyasoft_Holding from '../../assets/Esyasoft_Holding.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFileUpload, faFloppyDisk, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { ConvertSematicToLayout } from '../Utils/ImportRealJson'


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






  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(!file || file.type !== 'application/json') return;
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log("inside the handlefilechange")
      try{
        const content = event.target.result;
        const parseData = JSON.parse(content);


        const realData =  ConvertSematicToLayout(parseData);
        
        // console.log(parseData);
        // console.log(typeof parseData)
        onImport(realData);
      }
      catch(error){
        console.error("invalid JSON file", error);
      }
    }

    reader.onerror = () => {
      console.error("File reading failed")
    }
    reader.readAsText(file);
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
            <input type='file' ref={fileInputRef} style={{display:'none'}} accept='.json' onChange={handleFileChange}/>
           </div>

          </div>
        {/* </div> */}
    </div>
  )
}

export default NavBar