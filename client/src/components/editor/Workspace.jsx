import useEditorStore from "../../utils/editorStore"
import Image from "../image/image"
const WorkSpace=({previewImg})=>{
    const {textOptions,setTextOptions}=useEditorStore()
    return(<><div className="workspace">
        <div className="canvas">
<img src={previewImg.url} alt=""/>


{textOptions.text && (
    <div className="text" style={{left:textOptions.left,top:textOptions.top,fontSize:`${textOptions.fontSize}px`}}>
<input type="text" value={textOptions.text} onChange={e=>setTextOptions({...textOptions,text:e.target.value})}  style={({color:textOptions.color})}/>
<div className="deleteTextButton" onClick={()=>setTextOptions({...textOptions,text:""})}>
    <Image  path="/general/delete.svg"/>

</div>

    </div>
)}
        </div>  
        </div></>)
}
export default WorkSpace