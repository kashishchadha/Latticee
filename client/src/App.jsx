
import './App.css'
import LeftBar from './components/leftBar/leftBar.jsx'
import TopBar from './components/topBar/topBar.jsx'
import Gallery from './components/gallery/gallery.jsx'
function App() {

  return (
    <>
      <div className='app'>
      <LeftBar/>

      <div className="content">
        <TopBar/>
    <Gallery/>

      </div>
      </div>
     
    </>
  )
}

export default App
