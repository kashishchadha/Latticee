import { create } from 'zustand'
const useEditorStore = create((set) => ({
  selectedLayer:"canvas" ,
  textOptions:{
    text:"",
    fontSize:48,
    color:"#000000",
    top:0,
    left:0,
  },
  setSelectedLayer: (newLayer) => set({ selectedLayer:newLayer }),
  setTextOptions:(newLayer)=>set({selectedLayer:newLayer}),
  addText:()=>set({textOptions:{
     text:"Add Text",
    fontSize:48,
    color:"#000000",
    top:0,
    left:0,
  }})
}));
export default useEditorStore