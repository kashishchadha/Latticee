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
  formData.append("media",file);
  formData.append("textOptions",JSON.stringify(textOptions));
  formData.append("canvasOptions",JSON.stringify(canvasOptions));
  formData.append("link", formRef.current.link.value);
  try{
    const res=await apiRequest.post("/pin",formData,{
      headers:{
        "Content-Type":"multipart/form-data",
      },
    });
    console.log(res)
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
    <option >Choose a board</option>
     <option value="1">board1</option>
      <option value="2">board2</option>
       <option value="3">board3</option>
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