import Image from '../image/image.jsx'
const Layers=()=>{
    return(<><div className="layers">
        <div className="layersTitle">
            <h3>Layers</h3>
            <p>Select a layer to edit</p>
        </div>
        <div className="layer">
            <div className="layerImage">
                <Image path="/general/text.png " alt='' w={48} h={48}/>
            </div>
            <span>Add Text</span>
        </div>
        <div className="layer">
            <div className="layerImage" style={{backgroundColor:"teal"}}></div>
            <span>Canvas</span>

        </div>
        </div></>)
}
export default Layers