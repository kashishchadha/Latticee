import React, { useEffect, useRef, useState } from 'react'
import './createPage.css'
import IKImage from '../../components/image/image'
import useAuthStore from '../../utils/authStore'
import {  useNavigate } from 'react-router-dom'
import Editor from '../../components/editor/editor'
import useEditorStore from '../../utils/editorStore'
import apiRequest from '../../utils/apiRequest'
function CreatePage() {
  const {textOptions,canvasOptions}=useEditorStore();

  const {currentUser}=useAuthStore();
const Navigate=useNavigate();
useEffect(()=>{
if(!currentUser){
  Navigate("/auth")
}
}
,[currentUser,Navigate])
const formRef=useRef();
const [file,setFile]=useState(null);
const [previewImg,setPreviewImg]=useState({
  url:"",
  width:0,
  height:0,
});

const [isEditing,setIsEditing]=useState(false);
useEffect(()=>{
  if(file){
  const img=new Image();
  img.src=URL.createObjectURL(file);
  console.log(img.height);
  img.onload=()=>{
setPreviewImg({
  url:URL.createObjectURL(file),
  width:img.width,
  height:img.height
})
  }
}
},[file])

const handlesubmit= async()=>{
  if(isEditing){
    setIsEditing(false);
    return;
  }
  const formData=new FormData(formRef.current);
const safeTextOptions = {
  ...textOptions,
  height:Math.ceil(textOptions.height),
  left: Math.max(0, Number(textOptions.left)),
  top: Math.max(0, Number(textOptions.top)),
  fontSize: Number(textOptions.fontSize),
};
  formData.append("media",file);
  formData.append("textOptions",JSON.stringify(safeTextOptions));
  formData.append("canvasOptions",JSON.stringify(canvasOptions));
  console.log(JSON.stringify(textOptions));
  console.log(JSON.stringify(canvasOptions));
  try{
   
    const res=await apiRequest.post("/pin",formData,{
      headers:{
        "Content-Type":"multipart/form-data",
      },
    });
   Navigate(`/pin/${res.data._id}`)
  }catch(err){
    console.log(err);
  }
}
  return (
  <div className="createPage">
    <div className="createTop">
      <h1>{isEditing?"Design your pin":"Create Pin"}</h1>
      <button onClick={handlesubmit}>{isEditing?"Done":"Publish"}</button>
    </div>

    {isEditing?(<Editor previewImg={previewImg}/>):(
    <div className="createBottom">

      {previewImg.url?(<div className='preview'>
<img  src={previewImg.url} alt=''></img>
<div className="editIcon" onClick={()=>setIsEditing(true)}>
  <IKImage path='/general/edit.svg' alt=''/>
</div>

      </div>):(<> <label htmlFor='file' className="upload">
        <div className="uploadTitle">
          <IKImage path="/general/upload.svg" alt=""/>
          <span>Choose a file</span>
        </div>
<div className="uploadInfo">
  We recommend using high quality .jpg files less than 20 files less than 200 MB
</div>

      </label></>)}
     

<input type='file' id='file' hidden  onChange={(e)=> setFile(e.target.files[0])}/>
      <form className='createForm' ref={formRef}>
<div className="createFormItem">
  <label htmlFor="title">Title</label>
  <input type='text' placeholder='Add a title' name='title'
  id='title'/>
</div>

<div className="createFormItem">
  <label htmlFor="description">Description</label>
  <input type='text' placeholder='Add a description' name='description'
  id='description'/>
</div>

<div className="createFormItem">
  <label htmlFor="link">Link</label>
  <input type='text' placeholder='Add a link' name='link'
  id='link'/>
</div>

<div className="createFormItem">
  <label htmlFor="board">Board</label>
  <select name='board' id='board'>
    <option value="">Choose a board</option>
    <option value="64e8b2f1c2a4e2b1d8f9a123">Board 1</option>
    <option value="64e8b2f1c2a4e2b1d8f9a124">Board 2</option>
    <option value="64e8b2f1c2a4e2b1d8f9a125">Board 3</option>
  </select>
</div>

<div className="createFormItem">
  <label htmlFor="tags">Tagged topics</label>
  <input type='text' placeholder='Add tags' name='tags'
  id='tags'/>
  <small>Don't worry,people won't see your tags</small>
</div>


      </form>
    </div>
    )}
  </div>
  )
}

export default CreatePage