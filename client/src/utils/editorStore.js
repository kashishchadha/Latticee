import { create } from 'zustand'
const useEditorStore = create((set) => ({
  selectedLayer:"canvas" ,
  setSelectedLayer: (newLayer) => set({ selectedLayer:newLayer }),
removeCurrentUser: () => set({ currentUser: null }),
  updateCurrentUser: (updatedUser) => set({ currentUser: updatedUser }),
}));
export default useEditorStore