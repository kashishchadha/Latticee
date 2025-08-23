import { create } from 'zustand'
const useEditorStore = create((set) => ({
  selectedLayer:"canvas" ,
  setSelectedLayer: (newLayer) => set({ selectedLayer:newLayer }),
}));
export default useEditorStore